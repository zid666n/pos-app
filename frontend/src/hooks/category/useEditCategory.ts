import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { updateCategoryService, type TCategory, type TUpdateCategoryPayload } from "../../services/categoryService"

const useEditCategory = () => {
    const queryClient = useQueryClient()
    const initState = {
        id: 0,
        is_active: true,
        name: "",
    }

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [formState, setFormState] = useState<TUpdateCategoryPayload>(initState)

    const mutation = useMutation({
        mutationFn: async (state: TUpdateCategoryPayload) => await updateCategoryService(state),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['categories']})

            setIsModalOpen(false)
            setFormState(initState)
        }
    })

    const handleCancel = () => {
        setFormState(initState)
        setIsModalOpen(false)
    }
    
    const handleOpen = (category: TCategory) => {
        setFormState({...formState, ...category})
        setIsModalOpen(true)
    }

    const handleSelect = (name: string, value: string) => {
        const val = value.toLowerCase() === "active"
        setFormState({...formState, [name]: val})
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => setFormState({...formState, [e.target.name]: e.target.value})

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        mutation.mutate(formState)
    }

    return {
        isModalOpen,
        handleSubmit,
        handleOpen,
        handleCancel,
        handleSelect,
        handleChange,
        isLoading: mutation.isPending,
        formState
    }
}

export default useEditCategory