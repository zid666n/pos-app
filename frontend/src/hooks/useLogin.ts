import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { login, type TLoginPayload } from "../services/authService"

const useLogin = () => {
    const [formState, setFormState] = useState<TLoginPayload>({
        email: "",
        password: ""
    })
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const handleChange = (event: any) => setFormState(prev => ({ ...prev, [event.target.name]: event.target.value }))

    const handleCancel = () => setFormState({ email: "", password: "" })

    const handleSubmit = async (event: any) => {
        event.preventDefault()
        setLoading(true)
        try {
            const res = await login(formState)
            
            const result = await res.json()

            if (res.ok) {
                localStorage.setItem('user', result.data.token)
            }

            setTimeout(() => {
                navigate("/dashboard")
            }, 1000);
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
        
    }

    return {
        formState,
        loading,
        handleCancel,
        handleChange,
        handleSubmit
    }
}

export default useLogin