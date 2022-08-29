import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { CustomError } from '../utils/customError'

interface IUserAuthInfoRequest extends Request {
    user?: Object
}

const verifyToken = async (req: IUserAuthInfoRequest, res: Response, next: NextFunction) => {
    try {
        const authHeaders = req.headers['authorization']
        if (!authHeaders) return next("Sign In required")
        const token: string = authHeaders.split('Bearer ')[1]
        const data: jwt.JwtPayload = <jwt.JwtPayload>await jwt.verify(token, <string>process.env.TOKEN_SECRET)
        req.user = { name: data.name, email: data.email }
        next()
    } catch (error) {
        next(new CustomError(["Signin required!"], 401))
    }
}

export default verifyToken