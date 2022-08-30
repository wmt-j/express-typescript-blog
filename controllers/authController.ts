import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcrypt'
import User from "../models/userModel";
import { IUser } from "../utils/schemaInterfaces";
import { CustomError } from "../utils/customError";
import StatusCode from "../utils/statusCode";
import messages from "../utils/messages";
import generateAccessToken from "../utils/generateToken";
import generateOtp from "../utils/generateOtp";

export const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password, age } = req.body
        const otp = generateOtp()
        const newUser: IUser | null = await User.create({
            name, email, password, age, otp
        })
        if (!newUser) next(new CustomError([messages.internalError], StatusCode.ServerErrorInternal))
        res.status(StatusCode.SuccessCreated).json({ newUser, otp })
    } catch (error) {
        console.log(error)
        next(new CustomError([messages.internalError], StatusCode.ServerErrorInternal))
    }
}

export const signin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email, deleted: false, isVerified: true })
        if (!user) {
            return next(new CustomError([messages.invalidCredentials], StatusCode.ClientErrorNotFound))
        }
        if (await bcrypt.compare(password, <string>user.password)) {
            const jwt = generateAccessToken(user)
            res.status(StatusCode.SuccessOK).json({ jwt })
        }
        else {
            return next(new CustomError([messages.invalidCredentials], StatusCode.ClientErrorNotFound))
        }
    } catch (error) {
        console.log(error)
        next(new CustomError([messages.internalError], StatusCode.ServerErrorInternal))
    }
}