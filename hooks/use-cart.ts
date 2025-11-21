import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { Product } from '@prisma/client'

interface CartItem extends Product {
    quantity: number
}

interface CartStore {
    items: CartItem[]
    addItem: (data: Product) => void
    decreaseItem: (id: string) => void
    removeItem: (id: string) => void
    clearCart: () => void
}

export const useCart = create(
    persist<CartStore>(
        (set, get) => ({
            items: [],
            addItem: (data: Product) => {
                const currentItems = get().items
                const existingItem = currentItems.find((item) => item.id === data.id)

                if (existingItem) {
                    return set({
                        items: currentItems.map((item) =>
                            item.id === data.id ? { ...item, quantity: item.quantity + 1 } : item
                        )
                    })
                }

                set({ items: [...get().items, { ...data, quantity: 1 }] })
            },
            decreaseItem: (id: string) => {
                const currentItems = get().items
                const existingItem = currentItems.find((item) => item.id === id)

                if (existingItem && existingItem.quantity > 1) {
                    return set({
                        items: currentItems.map((item) =>
                            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
                        )
                    })
                }

                if (existingItem && existingItem.quantity === 1) {
                    set({ items: [...get().items.filter((item) => item.id !== id)] })
                }
            },
            removeItem: (id: string) => {
                set({ items: [...get().items.filter((item) => item.id !== id)] })
            },
            clearCart: () => set({ items: [] }),
        }),
        {
            name: 'cart-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
)
