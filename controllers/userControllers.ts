import { NextFunction, Request, Response } from "express"
import User from "../models/userModel"
import { CustomError } from "../utils/customError"
import messages from "../utils/messages"
import { IUser } from "../utils/schemaInterfaces"
import StatusCode from "../utils/statusCode"

class userController {
    getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users: IUser[] | [] = await User.find()
            if (users)
                res.status(StatusCode.SuccessOK).json({ users })
        } catch (error) {
            console.log(error)
            next(new CustomError([messages.internalError], 500))
        }
    }

    getOne = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { userId } = req.params
            const user: IUser | null = await User.findById(userId)
            res.status(StatusCode.SuccessOK).json({ user })
        } catch (error) {
            console.log(error);
            next(new CustomError([messages.userMissing], 404))
        }
    }

    newUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, email, age } = req.body
            const newUser: IUser = await User.create({ name, email, age })
            res.status(StatusCode.SuccessCreated).json({ newUser })
        } catch (error) {
            console.log(error)
            next(new CustomError([messages.internalError], 500))
        }
    }

    updateUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { userId } = req.params
            const { name, email, age } = req.body
            const updatedUser: IUser | null = await User.findByIdAndUpdate(userId, { name, email, age }, { runValidators: true, new: true })
            res.status(StatusCode.SuccessOK).json({ updatedUser })
        } catch (error) {
            console.log(error)
            next(new CustomError([messages.internalError], 500))
        }
    }

    deleteUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { userId } = req.params
            await User.findByIdAndUpdate(userId, { deleted: true })
            res.status(StatusCode.SuccessNoContent).json({ message: "Deleted!" })
        } catch (error) {
            console.log(error)
            next(new CustomError([messages.internalError], 500))
        }
    }
}

export default new userController()