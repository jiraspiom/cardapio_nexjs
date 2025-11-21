'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"
import { createCategory } from "@/app/admin/menu/actions"
import { useState } from "react"

export function CategoryDialog() {
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Nova Categoria
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Nova Categoria</DialogTitle>
                </DialogHeader>
                <form action={async (formData) => {
                    await createCategory(formData)
                    setOpen(false)
                }} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Nome da Categoria</Label>
                        <Input id="name" name="name" required placeholder="Ex: Bebidas" />
                    </div>
                    <Button type="submit" className="w-full">Salvar</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
