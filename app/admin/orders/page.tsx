import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, Utensils } from "lucide-react"
import prisma from "@/lib/prisma"
import { updateOrderStatus } from "./actions"

export default async function OrdersPage() {
    const orders = await prisma.order.findMany({
        include: {
            session: {
                include: { table: true }
            },
            items: {
                include: { product: true }
            }
        },
        orderBy: { createdAt: 'desc' }
    })

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'PENDING': return <Badge variant="secondary">Pendente</Badge>
            case 'PREPARING': return <Badge variant="default" className="bg-yellow-500">Preparando</Badge>
            case 'DELIVERED': return <Badge variant="default" className="bg-green-500">Entregue</Badge>
            case 'PAID': return <Badge variant="outline">Pago</Badge>
            default: return <Badge>{status}</Badge>
        }
    }

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Pedidos</h2>
                <p className="text-muted-foreground">Acompanhe e atualize o status dos pedidos.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {orders.map((order) => (
                    <Card key={order.id} className="flex flex-col">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Mesa {order.session.table.number}
                            </CardTitle>
                            {getStatusBadge(order.status)}
                        </CardHeader>
                        <CardContent className="flex-1">
                            <div className="text-xs text-muted-foreground mb-4">
                                {new Date(order.createdAt).toLocaleTimeString()}
                            </div>
                            <div className="space-y-2">
                                {order.items.map((item) => (
                                    <div key={item.id} className="flex justify-between text-sm">
                                        <span>{item.quantity}x {item.product.name}</span>
                                        <span className="text-muted-foreground">R$ {item.price.toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 pt-4 border-t flex justify-between items-center font-bold">
                                <span>Total</span>
                                <span>R$ {order.total.toFixed(2)}</span>
                            </div>
                            <div className="mt-4 flex gap-2">
                                {order.status === 'PENDING' && (
                                    <form action={updateOrderStatus.bind(null, order.id, 'PREPARING')} className="w-full">
                                        <Button className="w-full gap-2" size="sm">
                                            <Utensils className="h-4 w-4" />
                                            Preparar
                                        </Button>
                                    </form>
                                )}
                                {order.status === 'PREPARING' && (
                                    <form action={updateOrderStatus.bind(null, order.id, 'DELIVERED')} className="w-full">
                                        <Button className="w-full gap-2 bg-green-600 hover:bg-green-700" size="sm">
                                            <CheckCircle className="h-4 w-4" />
                                            Entregar
                                        </Button>
                                    </form>
                                )}
                                {order.status === 'DELIVERED' && (
                                    <Button disabled className="w-full gap-2" variant="outline" size="sm">
                                        <Clock className="h-4 w-4" />
                                        Aguardando Pagamento
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
                {orders.length === 0 && (
                    <div className="col-span-full text-center text-muted-foreground py-12">
                        Nenhum pedido encontrado.
                    </div>
                )}
            </div>
        </div>
    )
}
