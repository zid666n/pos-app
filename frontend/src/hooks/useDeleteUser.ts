import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { deleteUserService, type TUsers } from "../services/userService"

const useDeleteUser = () => {
    const queryClient = useQueryClient()
    const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false)
    const [user, setUser] = useState<TUsers|null>(null)

    const mutation = useMutation({
        mutationFn: async (id: number) => await deleteUserService(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['users']})

            setIsOpenDialog(false)
            setUser(null)
        }
    })

    const handleOpen = (user: TUsers) => {
        setUser(user)
        setIsOpenDialog(true)
    }
    
    const handleOnSubmit = () => {
        if (user) mutation.mutate(user.id)
    }

    const handleCancel = () => {
        setIsOpenDialog(false)
        setUser(null)
    }

    return {
        isOpenDialog,
        handleOnSubmit,
        handleCancel,
        handleOpen,
        user
    }
}

export default useDeleteUser