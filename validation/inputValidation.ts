import { body, check, param } from "express-validator";
import mongoose from "mongoose";
import User from "../models/userModel";

export const newUserCheck = () => [
    check('email').isEmail().withMessage("Email not valid!")
        .custom(value => User.findOne({ email: value }).then((user) => { if (user) { return Promise.reject("Email already exists") } })),
    check('age').isInt({ min: 0, max: 150 })
]

export const updateUserCheck = () => [
    check('email').isEmail().withMessage("Email not valid!"),
    check('age').isInt({ min: 0, max: 150 }),
    check('userId').isMongoId()
]

export const deleteUserCheck = () => [
    param('userId').custom(value => {
        const user = User.findOne({ id: value, status: true })
        if (!user) {
            return Promise.reject("No user found with that ID.")
        }
    })
]