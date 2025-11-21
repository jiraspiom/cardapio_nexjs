'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Users } from "lucide-react"

export function BillSplitter({ total }: { total: number }) {
    const [people, setPeople] = useState(1)

    const perPerson = total / (people || 1)

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Dividir Conta
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label>Número de Pessoas</Label>
                    <Input
                        type="number"
                        min="1"
                        value={people}
                        onChange={(e) => setPeople(parseInt(e.target.value) || 1)}
                    />
                </div>
                <div className="pt-4 border-t flex justify-between items-center">
                    <span className="font-medium">Valor por pessoa</span>
                    <span className="text-2xl font-bold text-primary">R$ {perPerson.toFixed(2)}</span>
                </div>
            </CardContent>
        </Card>
    )
}
