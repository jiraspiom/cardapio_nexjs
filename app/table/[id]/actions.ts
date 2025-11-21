'use server'

import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { nanoid } from "nanoid"

export async function joinTable(formData: FormData) {
    const tableId = formData.get('tableId') as string
    const name = formData.get('name') as string

    if (!tableId || !name) return

    // Check for active session
    let session = await prisma.tableSession.findFirst({
        where: {
            tableId,
            status: 'OPEN'
        }
    })

    // If no session, create one
    if (!session) {
        session = await prisma.tableSession.create({
            data: {
                tableId,
                uniqueCode: nanoid(6).toUpperCase(),
                status: 'OPEN'
            }
        })

        // Update table status
        await prisma.table.update({
            where: { id: tableId },
            data: { status: 'OCCUPIED' }
        })
    }

    // Create customer
    const customer = await prisma.customer.create({
        data: {
            name,
            sessionId: session.id
        }
    })

    // Set cookie
    const cookieStore = await cookies()
    cookieStore.set('restaurant_session', JSON.stringify({
        sessionId: session.id,
        customerId: customer.id,
        name: customer.name
    }), { secure: true, httpOnly: true })

    redirect(`/table/${tableId}/menu`)
}
