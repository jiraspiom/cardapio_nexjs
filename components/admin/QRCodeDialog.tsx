'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { QrCode } from "lucide-react"
import { QRCodeSVG } from "qrcode.react"

export function QRCodeDialog({ tableId, tableNumber }: { tableId: string, tableNumber: number }) {
    // In a real app, this URL would point to the actual domain
    const url = `http://localhost:3000/table/${tableId}`

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                    <QrCode className="h-4 w-4" />
                    Ver QR
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>QR Code - Mesa {tableNumber}</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col items-center justify-center p-6 space-y-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                        <QRCodeSVG value={url} size={200} />
                    </div>
                    <p className="text-sm text-muted-foreground text-center break-all">
                        {url}
                    </p>
                    <Button onClick={() => window.print()} variant="secondary">
                        Imprimir
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
