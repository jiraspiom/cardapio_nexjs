'use client'

import { Button } from "@/components/ui/button"
import { requestBill } from "@/app/table/[id]/bill/actions"
import { toast } from "sonner"
import { useState } from "react"

export function CloseBillButton({ sessionId }: { sessionId: string }) {
    const [loading, setLoading] = useState(false)

    const handleRequestBill = async () => {
        setLoading(true)
        try {
            await requestBill(sessionId)
            toast.success("Garçom chamado! Aguarde o fechamento da conta.", {
                duration: 3000,
                position: 'top-center'
            })
        } catch (error) {
            toast.error("Erro ao chamar garçom. Tente novamente.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Button
            className="w-full size-lg text-lg"
            variant="destructive"
            onClick={handleRequestBill}
            disabled={loading}
        >
            {loading ? "Chamando..." : "Fechar Conta / Chamar Garçom"}
        </Button>
    )
}
