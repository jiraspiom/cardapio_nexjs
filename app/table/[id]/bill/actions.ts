'use server'

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function requestBill(sessionId: string) {
    // In a real app, this would send a notification to the admin/waiter
    // For now, we'll just simulate a delay and return success
    // We could also update a status field if we had one for "PAYMENT_REQUESTED"

    console.log(`Bill requested for session ${sessionId}`)

    await prisma.tableSession.update({
        where: { id: sessionId },
        data: { paymentRequested: true }
    })

    revalidatePath('/admin/tables')

    return { success: true }
}
