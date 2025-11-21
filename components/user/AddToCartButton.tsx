'use client'

import { Product } from "@prisma/client"
import { useCart } from "@/hooks/use-cart"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"

export function AddToCartButton({ product }: { product: Product }) {
    const cart = useCart()

    const handleAddToCart = () => {
        cart.addItem(product)
        toast.success(`${product.name} adicionado!`, {
            duration: 1500,
            position: 'top-center'
        })
    }

    return (
        <Button size="sm" onClick={handleAddToCart}>
            Adicionar
        </Button>
    )
}
