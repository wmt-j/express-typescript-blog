import { check, ValidationChain } from "express-validator";
import User from "../models/userModel";
import messages from "../utils/messages";

export function signupCheck(): Array<ValidationChain> {
    return [
        check('email').isEmail().withMessage(messages.invalidEmail).custom(value => User.findOne({ email: value }).then((user) => { if (user) { return Promise.reject(messages.emailExists) } })),
        check('password').exists(),
        check('age').optional().isInt({ min: 0, max: 150 })
    ]
}

export function signinCheck(): Array<ValidationChain> {
    return [
        check('email').isEmail().withMessage(messages.invalidEmail).custom(value => User.findOne({ email: value, deleted: false, isVerified: true }).then((user) => { if (!user) { return Promise.reject(messages.userMissing) } })),
        check('password').exists()
    ]
}