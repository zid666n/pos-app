import express, { type NextFunction, type Request, type Response } from "express"
import cors from "cors"
import authRouter from "./routes/authRouter.ts"
import ApplicationException from "./modules/shared/application/exceptions/ApplicationException.ts"
import userRouter from "./routes/userRouter.ts"
import productRouter from "./routes/productRouter.ts"
import categoryRouter from "./routes/categoryRouter.ts"
import authMiddleware from "./middlewares/authMiddleware.ts"
import transactionRouter from "./routes/transactionRouter.ts"
import ValidationError from "./modules/shared/application/exceptions/ValidationError.ts"

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRouter)

app.use(authMiddleware)
app.use('/api/users', userRouter)
app.use('/api/categories', categoryRouter)
app.use('/api/products', productRouter)
app.use('/api/transactions', transactionRouter)

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to POS API"
    })
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ApplicationException) {
        if (err instanceof ValidationError) {
            return res
                .status(err.statusCode)
                .json({
                    errors: err.error.details.map(joiErr => {
                        return {
                            field: joiErr.path.join('.'),
                            message: joiErr.message

                        }
                    }),
                    message: err.message
                })
        }
        return res
        .status(err.statusCode)
        .json({
            message: err.message
        })

        
    } else {
        return res
            .status(500)
            .json({
                message: err.message
            })
    }

})

export default app