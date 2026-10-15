import axios from "axios"

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('user-token')

        if (token) config.headers.Authorization = `Bearer ${token}`

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

api.interceptors.response.use(
    (response) => response.data,

    async (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('user')
            localStorage.removeItem('user-token')
        }

        return Promise.reject()
    }
)

export default api