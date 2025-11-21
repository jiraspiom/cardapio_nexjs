'use client'

import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { ShoppingCart } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export function CartSummary({ tableId }: { tableId: string }) {
    const cart = useCart()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    const itemCount = cart.items.reduce((acc, item) => acc + item.quantity, 0)

    return (
        <Link href={`/table/${tableId}/cart`}>
            <Button variant="ghost" className="relative flex items-center gap-2">
                <div className="relative">
                    <ShoppingCart className="h-6 w-6" />
                    {itemCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full">
                            {itemCount}
                        </span>
                    )}
                </div>
                <span className="font-semibold">Carrinho</span>
            </Button>
        </Link>
    )
}
