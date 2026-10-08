import { useState } from "react"
import { createUserService, type TCreateUserPayload } from "../services/userService"

const useCreateUser = () => {
    const initState: TCreateUserPayload = {
        email: "",
        name: "",
        password: "",
        status: "active"
    }

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [formState, setFormState] = useState<TCreateUserPayload>(initState)

    const handleClose = () => setFormState(initState)

    const handleSelect = (name: string, value: string) => setFormState({...formState, [name]: value})

    const handleSubmit = async () => {
        try {
            setIsLoading(true)

            const req = await createUserService(formState)
            const res = await req.json()

            if (req.ok) {
                
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => setFormState({...formState, [e.target.name]: e.target.value})

    return {
        handleSubmit,
        handleChange,
        isLoading,
        handleClose,
        handleSelect
    }
}

export default useCreateUser