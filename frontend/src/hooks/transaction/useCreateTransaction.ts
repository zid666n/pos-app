import { useState } from "react"
import type { TProduct } from "../../services/productService"

const useCreateTransaction = () => {
    const [cart, setCart] = useState<TProduct[]>([])

    const addToCart = (product: TProduct) => {
        setCart(prev => {
            const ext = prev.find(item => item.id === product.id)

            if (ext) {
                if (ext.quantity >= product.quantity) return prev

                return prev.map(item => item.id === product.id ? {...item, quantity: item.quantity + 1} : item)
            }

            return [...prev, {...product, quantity: 1}]
        })
    }

    const removeFromCart = (id: number) => setCart(prev => prev.filter(prod => prod.id !== id))

    const updateQty = (id: number, quantity: number) => {
        setCart(prev => prev.map(item => {
                if (item.id === id) {
                    let nextQty = quantity + item.quantity

                    return nextQty > 0 && nextQty >= item.quantity ? {...item, quantity: nextQty} : item
                }
                return item
            })
            .filter(item => item.quantity > 0)
        )
    }

    return {
        addToCart,
        removeFromCart,
        updateQty,
        cart
    }

}

export default useCreateTransaction