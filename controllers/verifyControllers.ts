import { NextFunction, Response } from "express"
import User from "../models/userModel"
import { CustomError } from "../utils/customError"
import generateOtp from "../utils/generateOtp"
import generateAccessToken from "../utils/generateToken"
import messages from "../utils/messages"
import { IGetUserAuthInfoRequest } from "../utils/schemaInterfaces"
import StatusCode from "../utils/statusCode"

export const verifySignup = async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    const { otp, email } = req.body
    const user = await User.findOne({ email })
    if (user && user.otp === otp) {
        user.otp = ""
        user.isVerified = true
        const jwt = generateAccessToken(user)
        await user.save()
        res.status(StatusCode.SuccessOK).json({ jwt })
    }
    else {
        next(new CustomError([messages.accessDenied], StatusCode.ClientErrorUnauthorized))
    }
}

export const resendOtp = async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    const { email } = req.body
    const user = await User.findOne({ email, isVerified: false, deleted: false })
    if (user) {
        const newOtp = generateOtp()
        user.otp = newOtp
        await user.save()
        res.status(StatusCode.SuccessOK).json({ otp: newOtp })
    }
    else {
        next(new CustomError([messages.accessDenied], StatusCode.ClientErrorUnauthorized))
    }
}