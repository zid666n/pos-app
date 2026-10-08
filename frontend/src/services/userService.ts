export type TCreateUserPayload = {
    name: string,
    email: string,
    password: string,
    status: string
}

export const createUserService = async ({email, name, password, status}: TCreateUserPayload) => await fetch('http://localhost:5000/api/users', {
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        name,
        email,
        password,
        status
    })
})