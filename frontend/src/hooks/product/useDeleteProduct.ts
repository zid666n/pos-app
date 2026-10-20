import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { deleteProductService, type TProduct } from "../../services/productService"

const useDeleteProduct = () => {
    const queryClient = useQueryClient()
    const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false)
    const [product, setProduct] = useState<TProduct|null>(null)

    const mutation = useMutation({
        mutationFn: async (id: number) => await deleteProductService(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['products']})

            setIsOpenDialog(false)
            setProduct(null)
        }
    })

    const handleOpen = (product: TProduct) => {
        setProduct(product)
        setIsOpenDialog(true)
    }
    
    const handleOnSubmit = () => {
        if (product) mutation.mutate(product.id)
    }

    const handleCancel = () => {
        setIsOpenDialog(false)
        setProduct(null)
    }

    return {
        isOpenDialog,
        handleOnSubmit,
        handleCancel,
        handleOpen,
        product
    }
}

export default useDeleteProduct