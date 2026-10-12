import { useMutation, useQueryClient } from "@tanstack/react-query"
import { type TUsers, updateUserService, type TDeleteUserPayload } from "../services/userService"
import { useState } from "react"

const useEditUser = () => {
    const queryClient = useQueryClient()
    const initState = {
        id: 0,
        email: "",
        is_active: true,
        name: "",
        password: ""
    }

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [formState, setFormState] = useState<TDeleteUserPayload>(initState)

    const mutation = useMutation({
        mutationFn: async (state: TDeleteUserPayload) => await updateUserService(state.id, {
            name: state.name,
            email: state.email,
            is_active: state.is_active,
            password: state.password
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['users']})

            setIsModalOpen(false)
            setFormState(initState)
        }
    })

    const handleCancel = () => {
        setFormState(initState)
        setIsModalOpen(false)
    }
    
    const handleOpen = (user: TUsers) => {
        setFormState({...formState, ...user})
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

export default useEditUser