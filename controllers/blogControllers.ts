import { NextFunction, Request, Response } from 'express'
import Blog from '../models/blogModel'
import { IBlog, IGetUserAuthInfoRequest } from '../utils/schemaInterfaces'
import moment, { Moment } from 'moment'
import { CustomError } from '../utils/customError'
import StatusCode from '../utils/statusCode'
import messages from '../utils/messages'

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { date: filterDate } = req.query
        let dateObj: Moment = moment(<string>filterDate, "DD/MM/YYYY")
        interface QueryObj {
            author: Object,
            createdAt?: Object
        }
        const queryObj: QueryObj = {
            author: { $ne: null }
        }
        if (filterDate && dateObj.isValid()) {
            queryObj.createdAt = { $gte: dateObj.toDate() }
        }
        const blogs: IBlog[] | [] = await Blog.find(queryObj).populate('author')

        res.status(StatusCode.SuccessOK).json({ blogs })
    } catch (error) {
        console.log(error)
        next(new CustomError([messages.internalError], 500))
    }
}

export const newBlog = async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    try {
        const { title, body } = req.body
        if (!req.user) {
            return next(new CustomError([messages.signinRequired], 401))
        }
        const author = req?.user?.id
        const newBlog: IBlog = await Blog.create({ title, body, author })
        res.status(StatusCode.SuccessCreated).json({ newBlog })
    } catch (error) {
        console.log(error)
        next(new CustomError([messages.internalError], 500))
    }
}

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { blogId } = req.params
        const blog: IBlog | null = await Blog.findById(blogId).populate('author')
        res.status(StatusCode.SuccessOK).json({ blog })
    } catch (error) {
        console.log(error)
        next(new CustomError([messages.internalError], 500))
    }
}

export const updateBlog = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, body } = req.body
        const { blogId } = req.params
        const updatedBlog: IBlog | null = await Blog.findByIdAndUpdate(blogId, { title, body }, { runValidators: true, new: true })
        res.status(StatusCode.SuccessCreated).json({ updatedBlog })
    } catch (error) {
        console.log(error)
        next(new CustomError([messages.internalError], 500))
    }
}

export const deleteBlog = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { blogId } = req.params
        await Blog.findByIdAndDelete(blogId)
        res.status(StatusCode.SuccessNoContent)
    } catch (error) {
        console.log(error)
        next(new CustomError([messages.internalError], 500))
    }
}