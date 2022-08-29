import express, { Express, NextFunction, Request, Response } from 'express'
import 'dotenv/config'
import userRouter from './routes/userRoutes'
import blogRouter from './routes/blogRoutes'
import authRouter from './routes/authRoutes'
import './utils/mongooseConnection'
import handleError from './middlewares/handleError'
import rateLimiter from './middlewares/rateLimiter'
const app: Express = express()

app.use(rateLimiter)

app.use(express.json())

app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/blog', blogRouter)

app.all('*', (req: Request, res: Response, next: NextFunction) => {
    next({ status: 404, errors: [{ message: "Page Not Found!" }] })
})

app.use(handleError)

app.listen(3000, () => {
    console.log("Server started at port 3000");
})