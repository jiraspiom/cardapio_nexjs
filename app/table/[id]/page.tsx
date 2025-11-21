import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import prisma from "@/lib/prisma"
import { joinTable } from "./actions"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"

export default async function TableEntryPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const table = await prisma.table.findUnique({
        where: { id },
        include: {
            sessions: {
                where: { status: 'OPEN' },
                take: 1
            }
        }
    })

    if (!table) {
        return <div>Mesa não encontrada.</div>
    }

    const activeSession = table.sessions[0]

    // Check if user is already in this session
    const cookieStore = await cookies()
    const sessionToken = cookieStore.get('restaurant_session')

    if (sessionToken && activeSession) {
        try {
            const sessionData = JSON.parse(sessionToken.value)
            if (sessionData.sessionId === activeSession.id) {
                redirect(`/table/${id}/menu`)
            }
        } catch (e) {
            // Invalid cookie
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-4">
            <Card className="w-full max-w-sm">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Mesa {table.number}</CardTitle>
                    <CardDescription>
                        {activeSession
                            ? "Mesa aberta. Digite seu nome para entrar."
                            : "Mesa livre. Digite seu nome para abrir a mesa."}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={joinTable} className="space-y-4">
                        <input type="hidden" name="tableId" value={id} />
                        <div className="space-y-2">
                            <Label htmlFor="name">Seu Nome</Label>
                            <Input id="name" name="name" required placeholder="Ex: João" />
                        </div>
                        <Button type="submit" className="w-full size-lg">
                            {activeSession ? "Entrar na Mesa" : "Abrir Mesa"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
