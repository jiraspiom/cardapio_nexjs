'use server'

import prisma from "@/lib/prisma"
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"

export async function placeOrder(tableId: string, items: any[]) {
    const cookieStore = await cookies()
    const sessionToken = cookieStore.get('restaurant_session')

    if (!sessionToken) throw new Error("No session")

    const sessionData = JSON.parse(sessionToken.value)

    // Verify session matches table
    const session = await prisma.tableSession.findUnique({
        where: { id: sessionData.sessionId }
    })

    if (!session || session.tableId !== tableId || session.status !== 'OPEN') {
        throw new Error("Invalid session")
    }

    const total = items.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0)

    await prisma.order.create({
        data: {
            sessionId: session.id,
            customerId: sessionData.customerId,
            status: 'PENDING',
            total,
            items: {
                create: items.map((item: any) => ({
                    productId: item.id,
                    quantity: item.quantity,
                    price: item.price
                }))
            }
        }
    })

    revalidatePath(`/table/${tableId}/orders`)
    revalidatePath('/admin/orders')
    revalidatePath('/admin')
}
