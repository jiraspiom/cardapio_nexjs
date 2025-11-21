import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, QrCode as QrIcon, Armchair } from "lucide-react"
import prisma from "@/lib/prisma"
import { createTable, deleteTable } from "./actions"
import { QRCodeDialog } from "@/components/admin/QRCodeDialog"
import { FreeTableButton } from "@/components/admin/FreeTableButton"


export default async function TablesPage() {
    const tables = await prisma.table.findMany({
        orderBy: { number: 'asc' },
        include: {
            sessions: {
                where: { status: 'OPEN' }
            }
        }
    })

    const totalTables = tables.length
    const activeTables = tables.filter(t => t.status === 'OCCUPIED').length
    const availableTables = totalTables - activeTables

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">Gerenciar Mesas</h2>
                    <p className="text-slate-500 mt-1">Visualize e organize o layout do seu restaurante.</p>
                </div>
                <form action={createTable}>
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all">
                        <Plus className="mr-2 h-4 w-4" />
                        Adicionar Mesa
                    </Button>
                </form>
            </div>

            {/* Stats Overview */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-none shadow-md bg-gradient-to-br from-blue-50 to-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-blue-900">Total de Mesas</CardTitle>
                        <Armchair className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-700">{totalTables}</div>
                    </CardContent>
                </Card>
                <Card className="border-none shadow-md bg-gradient-to-br from-green-50 to-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-green-900">Livres</CardTitle>
                        <div className="h-2 w-2 rounded-full bg-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-700">{availableTables}</div>
                    </CardContent>
                </Card>
                <Card className="border-none shadow-md bg-gradient-to-br from-orange-50 to-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-orange-900">Ocupadas</CardTitle>
                        <div className="h-2 w-2 rounded-full bg-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-orange-700">{activeTables}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Tables Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {tables.map((table) => {
                    const activeSession = table.sessions[0]
                    const paymentRequested = activeSession?.paymentRequested

                    return (
                        <Card key={table.id} className={`group overflow-hidden border-slate-200 hover:border-blue-300 hover:shadow-md transition-all duration-300 ${paymentRequested ? 'ring-2 ring-red-500 border-red-500' : ''}`}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-slate-50/50 border-b border-slate-100">
                                <CardTitle className="text-lg font-semibold text-slate-700">
                                    Mesa {table.number}
                                </CardTitle>
                                <div className="flex gap-2">
                                    {paymentRequested && (
                                        <Badge variant="destructive" className="animate-pulse">
                                            Conta
                                        </Badge>
                                    )}
                                    <Badge variant={table.status === 'AVAILABLE' ? 'outline' : 'default'} className={table.status === 'AVAILABLE' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-orange-100 text-orange-700 hover:bg-orange-100 border-orange-200'}>
                                        {table.status === 'AVAILABLE' ? 'Livre' : 'Ocupada'}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-6 flex flex-col items-center justify-center min-h-[120px] gap-4">
                                <div className="p-4 bg-slate-50 rounded-full group-hover:bg-blue-50 transition-colors">
                                    <QrIcon className="h-8 w-8 text-slate-400 group-hover:text-blue-600 transition-colors" />
                                </div>
                                <div className="text-xs text-muted-foreground font-mono">
                                    ID: {table.id.slice(0, 8)}...
                                </div>
                            </CardContent>
                            <CardFooter className="flex items-center justify-between bg-slate-50/50 border-t border-slate-100 p-3">
                                <QRCodeDialog tableId={table.id} tableNumber={table.number} />

                                <form action={deleteTable.bind(null, table.id)}>
                                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-600 hover:bg-red-50 h-8 w-8">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </form>
                            </CardFooter>
                            {table.status === 'OCCUPIED' && (
                                <div className="px-6 pb-4">
                                    <FreeTableButton tableId={table.id} />
                                </div>
                            )}
                        </Card>
                    )
                })}

                {/* Empty State Card (if needed, or just the Add button at top) */}
                {tables.length === 0 && (
                    <div className="col-span-full flex flex-col items-center justify-center p-12 border-2 border-dashed border-slate-200 rounded-lg bg-slate-50/50 text-slate-400">
                        <Armchair className="h-12 w-12 mb-4 opacity-20" />
                        <p className="text-lg font-medium">Nenhuma mesa cadastrada</p>
                        <p className="text-sm">Comece adicionando sua primeira mesa acima.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
