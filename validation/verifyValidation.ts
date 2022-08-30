import { check, ValidationChain } from "express-validator";
import User from "../models/userModel";
import messages from "../utils/messages";

export function verifySignupCheck(): Array<ValidationChain> {
    return [
        check('otp').exists(),
        check('email').isEmail().withMessage(messages.invalidEmail)
            .custom(value => User.findOne({ email: value, isVerified: false }).then((user) => { if (!user) { return Promise.reject(messages.userMissing) } }))
    ]
}

export function verifyResendOtpCheck(): Array<ValidationChain> {
    return [
        check('email').isEmail().withMessage(messages.invalidEmail)
            .custom(value => User.findOne({ email: value, isVerified: false }).then((user) => { if (!user) { return Promise.reject(messages.userMissing) } }))
    ]
}