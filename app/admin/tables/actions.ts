'use server'

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function createTable() {
    // Find the next available number
    const lastTable = await prisma.table.findFirst({
        orderBy: { number: 'desc' }
    })

    const nextNumber = (lastTable?.number || 0) + 1

    await prisma.table.create({
        data: {
            number: nextNumber,
            status: 'AVAILABLE'
        }
    })

    revalidatePath('/admin/tables')
}

export async function deleteTable(id: string) {
    await prisma.table.delete({
        where: { id }
    })
    revalidatePath('/admin/tables')
}

export async function closeTableSession(tableId: string) {
    const activeSession = await prisma.tableSession.findFirst({
        where: {
            tableId,
            status: 'OPEN'
        }
    })

    if (!activeSession) {
        throw new Error("No active session found for this table")
    }

    // Close the session
    await prisma.tableSession.update({
        where: { id: activeSession.id },
        data: {
            status: 'CLOSED',
            endedAt: new Date()
        }
    })

    // Free the table
    await prisma.table.update({
        where: { id: tableId },
        data: {
            status: 'AVAILABLE'
        }
    })

    revalidatePath('/admin/tables')
}
