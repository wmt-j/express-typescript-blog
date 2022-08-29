import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcrypt'
import jwt, { Secret } from 'jsonwebtoken'
import User from "../models/userModel";
import { IUser } from "../utils/schemaInterfaces";

function generateAccessToken(user: IUser,) {
    const token = jwt.sign({ name: user.name, email: user.email }, <Secret>process.env.TOKEN_SECRET, { expiresIn: '3600s' })
    return token
}

export const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password, age } = req.body
        const newUser: IUser | null = await User.create({
            name, email, password, age
        })
        if (!newUser) next({ status: 500, message: "Cannot create new user, try again later!" })
        const jwt = generateAccessToken(newUser)
        res.status(201).json({ newUser, jwt })
    } catch (error) {
        next({ status: 500, message: error })
    }
}

export const signin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return next({ status: 404, message: "Invalid Credentils." })
        }
        if (await bcrypt.compare(password, <string>user.password)) {
            const jwt = generateAccessToken(user)
            res.status(201).json({ jwt })
        }
        else {
            return next({ status: 404, message: "Invalid Credentils." })
        }
    } catch (error) {
        next({ status: 500, message: error })
    }
}