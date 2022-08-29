import { Request, Response } from "express"
import User from "../models/userModel"
import { IUser } from "../utils/schemaInterfaces"

class userController {
    getAllUsers = async (req: Request, res: Response) => {
        try {
            const users: IUser[] | [] = await User.find()
            if (users)
                res.status(200).json({ users })
        } catch (error) {
            console.log(error)
        }
    }

    getOne = async (req: Request, res: Response) => {
        try {
            const { userId } = req.params
            const user: IUser | null = await User.findById(userId)
            res.status(200).json({ user })
        } catch (error) {
            console.log(error);
            res.status(404).send("404 not found!")
        }
    }

    newUser = async (req: Request, res: Response) => {
        try {
            const { name, email, age } = req.body
            const newUser: IUser = await User.create({ name, email, age })
            res.status(201).json({ newUser })
        } catch (error) {
            console.log(error)
        }
    }

    updateUser = async (req: Request, res: Response) => {
        try {
            const { userId } = req.params
            const { name, email, age } = req.body
            const updatedUser: IUser | null = await User.findOneAndUpdate({ id: userId }, { name, email, age }, { runValidators: true, new: true })
            res.status(201).json({ updatedUser })
        } catch (error) {
            console.log(error)
        }
    }

    deleteUser = async (req: Request, res: Response) => {
        try {
            const { userId } = req.params
            await User.findByIdAndUpdate(userId, { status: true })
            res.status(204).json({ msg: "Deleted" })
        } catch (error) {
            console.log(error)
        }
    }
}

export default new userController()