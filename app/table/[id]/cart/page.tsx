'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/hooks/use-cart"
import { Trash2, Minus, Plus, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { placeOrder } from "./actions"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { use } from "react"

export default function CartPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const cart = useCart()
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const total = cart.items.reduce((acc, item) => acc + (item.price * item.quantity), 0)

    const handlePlaceOrder = async () => {
        if (cart.items.length === 0) return

        setLoading(true)
        try {
            await placeOrder(id, cart.items)
            cart.clearCart()
            toast.success("Pedido realizado com sucesso!")
            router.push(`/table/${id}/orders`)
        } catch (error) {
            toast.error("Erro ao realizar pedido. Tente novamente.")
        } finally {
            setLoading(false)
        }
    }

    if (cart.items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
                <p className="text-muted-foreground">Seu carrinho está vazio.</p>
                <Link href={`/table/${id}/menu`}>
                    <Button variant="outline" className="gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Voltar ao Cardápio
                    </Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="space-y-8 pb-20">
            <div className="flex items-center gap-4">
                <Link href={`/table/${id}/menu`}>
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <h1 className="text-2xl font-bold">Seu Pedido</h1>
            </div>

            <div className="grid gap-4">
                {cart.items.map((item) => (
                    <Card key={item.id}>
                        <CardContent className="p-4 flex items-center justify-between">
                            <div className="flex-1">
                                <h3 className="font-medium">{item.name}</h3>
                                <p className="text-sm text-muted-foreground">R$ {item.price.toFixed(2)}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2 border rounded-md p-1">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6"
                                        onClick={() => cart.decreaseItem(item.id)}
                                    >
                                        <Minus className="h-3 w-3" />
                                    </Button>
                                    <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6"
                                        onClick={() => cart.addItem(item)}
                                    >
                                        <Plus className="h-3 w-3" />
                                    </Button>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-destructive h-8 w-8"
                                    onClick={() => cart.removeItem(item.id)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div >

            <div className="fixed bottom-16 left-0 right-0 p-4 bg-white border-t shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-muted-foreground">Total</span>
                    <span className="text-xl font-bold">R$ {total.toFixed(2)}</span>
                </div>
                <Button className="w-full size-lg text-lg" onClick={handlePlaceOrder} disabled={loading}>
                    {loading ? "Enviando..." : "Fazer Pedido"}
                </Button>
            </div>
        </div >
    )
}
