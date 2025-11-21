'use client'

import { Button } from "@/components/ui/button"
import { closeTableSession } from "@/app/admin/tables/actions"
import { toast } from "sonner"
import { useState } from "react"
import { LogOut } from "lucide-react"

export function FreeTableButton({ tableId }: { tableId: string }) {
    const [loading, setLoading] = useState(false)

    const handleFreeTable = async () => {
        setLoading(true)
        try {
            await closeTableSession(tableId)
            toast.success("Mesa liberada com sucesso!")
        } catch (error) {
            toast.error("Erro ao liberar mesa.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={handleFreeTable}
            disabled={loading}
            className="text-orange-600 border-orange-200 hover:bg-orange-50 hover:text-orange-700"
            title="Liberar Mesa"
        >
            <LogOut className="h-4 w-4 mr-2" />
            {loading ? "Liberando..." : "Liberar"}
        </Button>
    )
}
