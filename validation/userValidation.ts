import { check, param, ValidationChain } from "express-validator";
import User from "../models/userModel";
import messages from "../utils/messages";

export const newUserCheck = (): Array<ValidationChain> => [
    check('email').isEmail().withMessage(messages.invalidEmail).custom(value => User.findOne({ email: value }).then((user) => { if (user) { return Promise.reject(messages.emailExists) } })),
    check('age').optional().isInt({ min: 0, max: 150 }),
]

export const updateUserCheck = (): Array<ValidationChain> => [
    check('email').optional().isEmail().withMessage(messages.invalidEmail),
    check('age').optional().isInt({ min: 0, max: 150 }),
    param('userId').isMongoId().bail().custom(async value => {
        const user = await User.findOne({ id: value, status: true })
        if (!user) {
            return Promise.reject(messages.userMissing)
        }
    })
]

export const deleteUserCheck = (): Array<ValidationChain> => [
    param('userId').custom(async value => {
        const user = await User.findOne({ _id: value, deleted: false })
        if (!user) {
            return Promise.reject(messages.userMissing)
        }
    })
]