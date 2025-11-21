'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"
import { createProduct, updateProduct } from "@/app/admin/menu/actions"
import { useState } from "react"
import { Category, Product } from "@prisma/client"

interface ProductDialogProps {
    categories: Category[]
    product?: Product
    trigger?: React.ReactNode
}

export function ProductDialog({ categories, product, trigger }: ProductDialogProps) {
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button className="gap-2">
                        <Plus className="h-4 w-4" />
                        Novo Produto
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{product ? 'Editar Produto' : 'Novo Produto'}</DialogTitle>
                </DialogHeader>
                <form action={async (formData) => {
                    if (product) {
                        await updateProduct(product.id, formData)
                    } else {
                        await createProduct(formData)
                    }
                    setOpen(false)
                }} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Nome</Label>
                        <Input id="name" name="name" defaultValue={product?.name} required placeholder="Ex: Coca-Cola" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Descrição</Label>
                        <Input id="description" name="description" defaultValue={product?.description || ''} placeholder="Opcional" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="price">Preço (R$)</Label>
                        <Input id="price" name="price" type="number" step="0.01" defaultValue={product?.price} required placeholder="0.00" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="categoryId">Categoria</Label>
                        <select
                            id="categoryId"
                            name="categoryId"
                            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            defaultValue={product?.categoryId}
                            required
                        >
                            <option value="" disabled>Selecione uma categoria</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                    <Button type="submit" className="w-full">Salvar</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
