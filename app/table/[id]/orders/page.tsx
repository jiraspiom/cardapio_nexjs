import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import prisma from "@/lib/prisma"
import { cookies } from "next/headers"

export default async function UserOrdersPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const cookieStore = await cookies()
    const sessionToken = cookieStore.get('restaurant_session')

    if (!sessionToken) return <div>Sessão não encontrada</div>

    const sessionData = JSON.parse(sessionToken.value)

    const orders = await prisma.order.findMany({
        where: {
            sessionId: sessionData.sessionId,
            // We show all orders for the session, or just for the customer?
            // "Os valores serao aculumado para a mesa." -> Show all orders for the table session usually, but maybe highlight mine.
            // For now, let's show all orders for the session so they can see what the table ordered.
        },
        include: {
            items: {
                include: { product: true }
            },
            customer: true
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
        <div className="space-y-8 pb-20">
            <div className="space-y-2">
                <h1 className="text-2xl font-bold">Pedidos da Mesa</h1>
                <p className="text-muted-foreground text-sm">Acompanhe o status dos pedidos.</p>
            </div>

            <div className="grid gap-4">
                {orders.map((order) => (
                    <Card key={order.id}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <div className="flex flex-col">
                                <CardTitle className="text-sm font-medium">
                                    Pedido #{order.id.slice(-4)}
                                </CardTitle>
                                <span className="text-xs text-muted-foreground">por {order.customer?.name}</span>
                            </div>
                            {getStatusBadge(order.status)}
                        </CardHeader>
                        <CardContent>
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
                        </CardContent>
                    </Card>
                ))}
                {orders.length === 0 && (
                    <div className="text-center text-muted-foreground py-12">
                        Nenhum pedido realizado ainda.
                    </div>
                )}
            </div>
        </div>
    )
}
