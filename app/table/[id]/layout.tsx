import { Button } from "@/components/ui/button"
import { ShoppingBag, UtensilsCrossed, FileText, Receipt } from "lucide-react"
import Link from "next/link"
import { CartSummary } from "@/components/user/CartSummary"

export default async function TableLayout({
    children,
    params
}: {
    children: React.ReactNode
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    return (
        <div className="flex flex-col min-h-screen bg-slate-50 pb-20">
            <header className="sticky top-0 z-10 bg-white border-b px-4 h-14 flex items-center justify-between shadow-sm">
                <div className="font-bold text-lg text-primary flex items-center gap-2">
                    <UtensilsCrossed className="h-5 w-5" />
                    <span>Menu</span>
                </div>
                <CartSummary tableId={id} />
            </header>
            <main className="flex-1 p-4">
                {children}
            </main>
            <nav className="fixed bottom-0 left-0 right-0 bg-white border-t h-16 flex items-center justify-around z-10">
                <Link href={`/table/${id}/menu`} className="flex flex-col items-center gap-1 text-xs text-muted-foreground hover:text-primary">
                    <UtensilsCrossed className="h-5 w-5" />
                    Cardápio
                </Link>
                <Link href={`/table/${id}/orders`} className="flex flex-col items-center gap-1 text-xs text-muted-foreground hover:text-primary">
                    <FileText className="h-5 w-5" />
                    Meus Pedidos
                </Link>
                <Link href={`/table/${id}/bill`} className="flex flex-col items-center gap-1 text-xs text-muted-foreground hover:text-primary">
                    <Receipt className="h-5 w-5" />
                    Conta
                </Link>
            </nav>
        </div>
    )
}
