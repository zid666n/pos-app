import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createProductService, type TCreateProductPayload } from "../../services/productService"
import { useState } from "react"

const useCreateProduct = () => {
    const initState: TCreateProductPayload = {
        category_id: 0,
        name: "",
        price: 0,
        quantity: 0,
        is_active: true
    }
    
    const [formState, setFormState] = useState<TCreateProductPayload>(initState)
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: createProductService,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['products']})


        }
    })

    const handleClose = () => setFormState(initState)

    const handleSelect = (name: string, value: string|number) => {
        setFormState({...formState, [name]: Number(value)})
    }

    const handleSubmit =  (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        mutation.mutate(formState)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => setFormState({...formState, [e.target.name]: e.target.value})

    return {
        handleSubmit,
        handleChange,
        isLoading: mutation.isPending,
        handleClose,
        handleSelect
    }
}

export default useCreateProduct