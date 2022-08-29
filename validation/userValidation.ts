import { check, param } from "express-validator";
import User from "../models/userModel";
import messages from "../utils/messages";

export const newUserCheck = () => [
    check('email').isEmail().withMessage(messages.invalidEmail)
        .custom(value => User.findOne({ email: value }).then((user) => { if (user) { return Promise.reject(messages.emailExists) } })),
    check('age').optional().isInt({ min: 0, max: 150 }),
]

export const updateUserCheck = () => [
    check('email').optional().isEmail().withMessage(messages.invalidEmail),
    check('age').optional().isInt({ min: 0, max: 150 }),
    check('userId').isMongoId().bail().custom(value => {
        const user = User.findOne({ id: value, status: true })
        if (!user) {
            return Promise.reject(messages.userMissing)
        }
    })
]

export const deleteUserCheck = () => [
    param('userId').custom(async value => {
        const user = await User.findOne({ _id: value, deleted: false })
        console.log(user);
        if (!user) {
            return Promise.reject("No user found with that ID.")
        }
    })
]