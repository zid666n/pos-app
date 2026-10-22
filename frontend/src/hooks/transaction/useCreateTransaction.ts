import { useEffect, useState } from "react"
import type { TProduct } from "../../services/productService"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createTransactionService, type TCreateTransactionPayload } from "../../services/transactionService"
import { useNavigate } from "react-router-dom"

const useCreateTransaction = () => {
    const navigate = useNavigate()
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("QRIS")
    const [cart, setCart] = useState<TProduct[]>([])
    const initState: TCreateTransactionPayload = {
        items: [],
        pay: 0,
        payment_method: 1
    }
    const [formState, setFormState] = useState<TCreateTransactionPayload>(initState)
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: async (payload: TCreateTransactionPayload) => await createTransactionService(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['transactions']})
            // setCart([])
            // setFormState(initState)

            // navigate('/transactions')
        }
    })

    useEffect(() => {
        console.log(cart)
        setFormState(prev => ({
            ...prev,
            items: cart.map(item => ({
                product_id: item.id,
                quantity: item.quantity
            }))
        }))
    }, [cart])

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

    const removeFromCart = (id: number) => {
        setCart(prev => prev.filter(prod => prod.id !== id))
    }

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

    const totalAmount = cart.reduce((acc, item) => acc + (Number(item.price) * item.quantity), 0)
    const totalChange = (formState.pay > totalAmount) ? formState.pay - totalAmount : 0

    const handleSelect = (name: string, value: string|number) => {
        setFormState({...formState, [name]: Number(value)})
    }

    const handleSubmit =  () => {
        mutation.mutate(formState)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => setFormState({...formState, [e.target.name]: e.target.value})

    const setPlaceholderPaymentMethod = (value: string) => setSelectedPaymentMethod(value)

    return {
        addToCart,
        formState,
        removeFromCart,
        updateQty,
        cart,
        totalAmount,
        totalChange,
        handleSelect,
        handleSubmit,
        handleChange,
        selectedPaymentMethod,
        setPlaceholderPaymentMethod
    }

}

export default useCreateTransaction