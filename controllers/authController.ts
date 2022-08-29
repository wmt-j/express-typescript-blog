import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcrypt'
import jwt, { Secret } from 'jsonwebtoken'
import User from "../models/userModel";
import { IUser } from "../utils/schemaInterfaces";
import { CustomError } from "../utils/customError";
import StatusCode from "../utils/statusCode";
import messages from "../utils/messages";

function generateAccessToken(user: IUser) {
    const token = jwt.sign({ id: user._id?.toString(), name: user.name, email: user.email }, <Secret>process.env.TOKEN_SECRET, { expiresIn: '3600s' })
    return token
}

export const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password, age } = req.body
        const newUser: IUser | null = await User.create({
            name, email, password, age
        })
        if (!newUser) next(new CustomError([messages.internalError], 500))
        const jwt = generateAccessToken(newUser)
        res.status(StatusCode.SuccessCreated).json({ newUser, jwt })
    } catch (error) {
        console.log(error)
        next(new CustomError([messages.internalError], 500))
    }
}

export const signin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return next(new CustomError([messages.invalidCredentials], 404))
        }
        if (await bcrypt.compare(password, <string>user.password)) {
            const jwt = generateAccessToken(user)
            res.status(StatusCode.SuccessOK).json({ jwt })
        }
        else {
            return next(new CustomError([messages.invalidCredentials], 404))
        }
    } catch (error) {
        console.log(error)
        next(new CustomError([messages.internalError], 500))
    }
}