import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { CustomError } from '../utils/customError'
import messages from '../utils/messages'
import { IGetUserAuthInfoRequest } from '../utils/schemaInterfaces'

const verifyToken = async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    try {
        const authHeaders = req.headers['authorization']
        if (!authHeaders) return next(new CustomError([messages.signinRequired], 401))
        const token: string = authHeaders.split('Bearer ')[1]
        const data: jwt.JwtPayload = <jwt.JwtPayload>await jwt.verify(token, <string>process.env.TOKEN_SECRET)
        req.user = { id: data.id, name: data.name, email: data.email }
        next()
    } catch (error) {
        console.log(error);
        next(new CustomError([messages.signinRequired], 401))
    }
}

export default verifyToken