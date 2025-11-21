import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import prisma from "@/lib/prisma"
import { cookies } from "next/headers"
import { BillSplitter } from "@/components/user/BillSplitter"
import { CloseBillButton } from "@/components/user/CloseBillButton"

export default async function BillPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const cookieStore = await cookies()
    const sessionToken = cookieStore.get('restaurant_session')

    if (!sessionToken) return <div>Sessão não encontrada</div>

    const sessionData = JSON.parse(sessionToken.value)

    const session = await prisma.tableSession.findUnique({
        where: { id: sessionData.sessionId },
        include: {
            orders: {
                include: { items: true }
            }
        }
    })

    if (!session) return <div>Sessão inválida</div>

    const total = session.orders.reduce((acc, order) => acc + order.total, 0)

    return (
        <div className="space-y-8 pb-20">
            <div className="space-y-2">
                <h1 className="text-2xl font-bold">Conta da Mesa</h1>
                <p className="text-muted-foreground text-sm">Visualize e divida a conta.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Resumo</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-4xl font-bold text-center py-8">
                        R$ {total.toFixed(2)}
                    </div>
                </CardContent>
            </Card>

            <BillSplitter total={total} />

            <div className="fixed bottom-16 left-0 right-0 p-4 bg-white border-t shadow-lg">
                <CloseBillButton sessionId={session.id} />
            </div>
        </div>
    )
}
