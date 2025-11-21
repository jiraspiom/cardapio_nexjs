import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, Pencil } from "lucide-react"
import prisma from "@/lib/prisma"
import { deleteProduct } from "./actions"
import { ProductDialog } from "@/components/admin/ProductDialog"
import { CategoryDialog } from "@/components/admin/CategoryDialog"

export default async function MenuPage() {
    const products = await prisma.product.findMany({
        include: { category: true },
        orderBy: { name: 'asc' }
    })

    const categories = await prisma.category.findMany({
        orderBy: { name: 'asc' }
    })

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Cardápio</h2>
                    <p className="text-muted-foreground">Gerencie produtos e categorias.</p>
                </div>
                <div className="flex gap-2">
                    <CategoryDialog />
                    <ProductDialog categories={categories} />
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Produtos</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nome</TableHead>
                                <TableHead>Categoria</TableHead>
                                <TableHead>Preço</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell className="font-medium">{product.name}</TableCell>
                                    <TableCell>{product.category.name}</TableCell>
                                    <TableCell>R$ {product.price.toFixed(2)}</TableCell>
                                    <TableCell>
                                        <Badge variant={product.active ? 'default' : 'secondary'}>
                                            {product.active ? 'Ativo' : 'Inativo'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right flex justify-end gap-2">
                                        <ProductDialog product={product} categories={categories} trigger={
                                            <Button variant="ghost" size="icon">
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                        } />
                                        <form action={deleteProduct.bind(null, product.id)}>
                                            <Button variant="ghost" size="icon" className="text-destructive">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </form>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {products.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center text-muted-foreground h-24">
                                        Nenhum produto cadastrado.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
