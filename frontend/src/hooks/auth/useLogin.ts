import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { loginService, type TLoginPayload } from "../../services/authService"
import { useMutation } from "@tanstack/react-query"

const useLogin = () => {
    const [formState, setFormState] = useState<TLoginPayload>({
        email: "",
        password: ""
    })
    const navigate = useNavigate()

    const mutation = useMutation({
        mutationFn: async (p: TLoginPayload) => await loginService(p),
        onSuccess: (data) => {
            localStorage.setItem('user-token', data.data.token)

            navigate("/dashboard")
        }
    })

    const handleChange = (event: any) => setFormState(prev => ({ ...prev, [event.target.name]: event.target.value }))

    const handleCancel = () => setFormState({ email: "", password: "" })

    const handleSubmit = async (event: any) => {
        event.preventDefault()

        mutation.mutate(formState)
    }

    return {
        formState,
        loading: mutation.isPending,
        handleCancel,
        handleChange,
        handleSubmit
    }
}

export default useLogin