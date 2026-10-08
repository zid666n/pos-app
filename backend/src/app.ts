import express, { type NextFunction, type Request, type Response } from "express"
import cors from "cors"
import authRouter from "./routes/authRouter.ts"
import ApplicationException from "./exceptions/ApplicationException.ts"

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRouter)

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to POS API"
    })
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ApplicationException) {
        return res
        .status(err.statusCode)
        .json({
            message: err.message
        })
    }

    return res
        .status(500)
        .json({
            message: "Internal Server Errorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr"
        })
})

export default app