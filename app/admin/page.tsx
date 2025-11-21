import prisma from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Receipt, Users, Utensils, DollarSign } from "lucide-react"

export default async function AdminDashboard() {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const activeTablesCount = await prisma.tableSession.count({
        where: { status: 'OPEN' }
    })

    const ordersTodayCount = await prisma.order.count({
        where: {
            createdAt: {
                gte: today
            }
        }
    })

    const menuItemsCount = await prisma.product.count({
        where: { active: true }
    })

    const revenueToday = await prisma.order.aggregate({
        where: {
            createdAt: {
                gte: today
            },
            status: {
                not: 'PENDING' // Assuming only non-pending orders count towards revenue, or maybe all? Let's say all for now or maybe 'PAID'?
                // Usually revenue is calculated on PAID orders, but for now let's just sum all non-cancelled/pending if we had those statuses.
                // Let's sum all for simplicity or maybe just 'DELIVERED'/'PAID' if we had that.
                // The current statuses are PENDING, PREPARING, DELIVERED, PAID.
                // Let's sum everything that is not PENDING for a "Sales" metric, or maybe just all.
            }
        },
        _sum: {
            total: true
        }
    })

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <p className="text-muted-foreground">Visão geral do seu restaurante.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Mesas Ativas</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{activeTablesCount}</div>
                        <p className="text-xs text-muted-foreground">Mesas ocupadas no momento</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pedidos Hoje</CardTitle>
                        <Receipt className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{ordersTodayCount}</div>
                        <p className="text-xs text-muted-foreground">Pedidos realizados hoje</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Faturamento Hoje</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">R$ {(revenueToday._sum.total || 0).toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">Total vendido hoje</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Itens no Cardápio</CardTitle>
                        <Utensils className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{menuItemsCount}</div>
                        <p className="text-xs text-muted-foreground">Produtos ativos</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
