'use server'

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function createCategory(formData: FormData) {
    const name = formData.get('name') as string

    await prisma.category.create({
        data: { name }
    })

    revalidatePath('/admin/menu')
}

export async function createProduct(formData: FormData) {
    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const price = parseFloat(formData.get('price') as string)
    const categoryId = formData.get('categoryId') as string

    await prisma.product.create({
        data: {
            name,
            description,
            price,
            categoryId,
            active: true
        }
    })

    revalidatePath('/admin/menu')
}

export async function updateProduct(id: string, formData: FormData) {
    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const price = parseFloat(formData.get('price') as string)
    const categoryId = formData.get('categoryId') as string

    await prisma.product.update({
        where: { id },
        data: {
            name,
            description,
            price,
            categoryId
        }
    })

    revalidatePath('/admin/menu')
}

export async function deleteProduct(id: string) {
    await prisma.product.delete({
        where: { id }
    })
    revalidatePath('/admin/menu')
}
