import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { deleteCategoryService, type TCategory } from "../../services/categoryService"

const useDeleteCategory = () => {
    const queryClient = useQueryClient()
    const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false)
    const [category, setCategory] = useState<TCategory|null>(null)

    const mutation = useMutation({
        mutationFn: async (id: number) => await deleteCategoryService(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['categories']})

            setIsOpenDialog(false)
            setCategory(null)
        }
    })

    const handleOpen = (category: TCategory) => {
        setCategory(category)
        setIsOpenDialog(true)
    }
    
    const handleOnSubmit = () => {
        if (category) mutation.mutate(category.id)
    }

    const handleCancel = () => {
        setIsOpenDialog(false)
        setCategory(null)
    }

    return {
        isOpenDialog,
        handleOnSubmit,
        handleCancel,
        handleOpen,
        category
    }
}

export default useDeleteCategory