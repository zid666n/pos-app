export type TLoginPayload = {
    email: string,
    password: string
} 
export const login = async ({email, password}: TLoginPayload) => {
    return await fetch('http://localhost:5000/api/auth/login', {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
}