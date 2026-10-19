import { useState } from "react"
import { createCategoryService, type TCreateCategoryPayload } from "../../services/categoryService"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const useCreateCategory = () => {
    const initState: TCreateCategoryPayload = {
        name: "",
        is_active: true
    }
    
    const [formState, setFormState] = useState<TCreateCategoryPayload>(initState)
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: createCategoryService,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['categories']})


        }
    })

    const handleClose = () => setFormState(initState)

    const handleSelect = (name: string, value: string) => {
        const val = value.toLowerCase() === "active"

        setFormState({...formState, [name]: val})
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

export default useCreateCategory