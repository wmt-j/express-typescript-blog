import express, { Express, Request, Response } from 'express'
import 'dotenv/config'
import router from './routes/userRoutes'
import './utils/mongooseConnection'
const app: Express = express()

app.use(express.json())

app.use('/', router)

app.listen(3000, () => {
    console.log("Server started at port 3000");
})