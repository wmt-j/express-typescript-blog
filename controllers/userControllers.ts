import { Request, Response } from "express"
import { validationResult } from "express-validator"
import User from "../models/userModel"
import { IError, IUser } from "../utils/schemaInterafaces"

class userController {
    getAllUsers = async (req: Request, res: Response) => {
        const users: IUser[] | [] = await User.find()
        if (users)
            res.status(200).json({ users })
    }

    getOne = async (req: Request, res: Response) => {
        const { userId } = req.params
        try {
            const user: IUser | null = await User.findById(userId)
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array().map((error: IError) => { return { message: error.msg } }) });
            }
            res.status(200).json({ user })
        } catch (error) {
            console.log(error);
            res.status(404).send("404 not found!")
        }
    }

    newUser = async (req: Request, res: Response) => {
        const { name, email, age } = req.body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array().map((error: IError) => { return { message: error.msg } }) });
        }
        const newUser: IUser = await User.create({ name, email, age })
        res.status(201).json({ newUser })
    }

    updateUser = async (req: Request, res: Response) => {
        const { userId } = req.params
        const { name, email, age } = req.body
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array().map(error => { return { message: error.msg } }) })
        }
        const updatedUser: IUser | null = await User.findOneAndUpdate({ id: userId }, { name, email, age }, { runValidators: true, new: true })
        res.status(201).json({ updatedUser })
    }

    deleteUser = async (req: Request, res: Response) => {
        const { userId } = req.params
        const errors = validationResult(req)
        if (errors.array().length > 0) {
            return res.status(400).json({ errors: errors.array().map((error => { return { message: error.msg } })) })
        }
        await User.findByIdAndUpdate(userId, { status: true })
        res.status(204).json({ msg: "Deleted" })
    }
}

export default new userController()