import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import prisma from "@/lib/prisma"
import { AddToCartButton } from "@/components/user/AddToCartButton"

export default async function MenuPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const categories = await prisma.category.findMany({
        include: {
            products: {
                where: { active: true }
            }
        }
    })

    return (
        <div className="space-y-8 pb-20">
            <div className="space-y-2">
                <h1 className="text-2xl font-bold">Cardápio</h1>
                <p className="text-muted-foreground text-sm">Escolha o que deseja pedir.</p>
            </div>

            {categories.map((category) => (
                <div key={category.id} className="space-y-4">
                    <h2 className="text-xl font-semibold sticky top-14 bg-slate-50 py-2 z-0">{category.name}</h2>
                    <div className="grid gap-4">
                        {category.products.map((product) => (
                            <Card key={product.id} className="overflow-hidden">
                                <CardContent className="p-4 flex gap-4">
                                    {/* Placeholder for image if we had one */}
                                    <div className="h-20 w-20 bg-muted rounded-md flex-shrink-0" />
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <h3 className="font-medium">{product.name}</h3>
                                            <p className="text-xs text-muted-foreground line-clamp-2">{product.description}</p>
                                        </div>
                                        <div className="flex items-center justify-between mt-2">
                                            <span className="font-bold">R$ {product.price.toFixed(2)}</span>
                                            <AddToCartButton product={product} />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}
