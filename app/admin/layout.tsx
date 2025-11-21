import Link from "next/link"
import { LayoutDashboard, UtensilsCrossed, QrCode, Receipt, LogOut, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const NavContent = () => (
    <nav className="flex flex-col gap-4 px-4 py-6">
      <Link href="/admin">
        <Button variant="ghost" className="w-full justify-start gap-2">
          <LayoutDashboard className="h-4 w-4" />
          Dashboard
        </Button>
      </Link>
      <Link href="/admin/tables">
        <Button variant="ghost" className="w-full justify-start gap-2">
          <QrCode className="h-4 w-4" />
          Mesas & QR Codes
        </Button>
      </Link>
      <Link href="/admin/menu">
        <Button variant="ghost" className="w-full justify-start gap-2">
          <UtensilsCrossed className="h-4 w-4" />
          Cardápio
        </Button>
      </Link>
      <Link href="/admin/orders">
        <Button variant="ghost" className="w-full justify-start gap-2">
          <Receipt className="h-4 w-4" />
          Pedidos
        </Button>
      </Link>
    </nav>
  )

  return (
    <div className="flex h-screen w-full bg-muted/40">
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r bg-background sm:flex">
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/admin" className="flex items-center gap-2 font-bold text-lg text-primary">
            <UtensilsCrossed className="h-6 w-6" />
            <span>Restaurante SaaS</span>
          </Link>
        </div>
        <NavContent />
        <div className="mt-auto p-4 border-t">
          <Button variant="outline" className="w-full gap-2 text-destructive hover:text-destructive">
            <LogOut className="h-4 w-4" />
            Sair
          </Button>
        </div>
      </aside>

      <main className="flex flex-1 flex-col sm:pl-64">
        {/* Mobile Header */}
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link href="/admin" className="flex items-center gap-2 font-bold text-lg text-primary">
                  <UtensilsCrossed className="h-6 w-6" />
                  <span>Restaurante SaaS</span>
                </Link>
                <NavContent />
              </nav>
            </SheetContent>
          </Sheet>
          <div className="font-bold text-lg">Admin</div>
        </header>

        <div className="p-4 sm:p-8 lg:p-12">
          {children}
        </div>
      </main>
    </div>
  )
}
