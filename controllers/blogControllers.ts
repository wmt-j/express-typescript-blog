import { NextFunction, Request, Response } from 'express'
import Blog from '../models/blogModel'
import { IBlog } from '../utils/schemaInterfaces'
import moment, { Moment } from 'moment'

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

        res.status(200).json({ blogs })
    } catch (error) {
        next({ status: 500, message: error })
    }
}

export const newBlog = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, body, userId: author } = req.body
        const newBlog: IBlog = await Blog.create({ title, body, author })
        res.status(201).json({ newBlog })
    } catch (error) {
        next({ status: 500, message: error })
    }
}

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { blogId } = req.params
        const blog: IBlog | null = await Blog.findById(blogId).populate('author')
        res.status(200).json({ blog })
    } catch (error) {
        next({ status: 500, message: error })
    }
}

export const updateBlog = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, body } = req.body
        const { blogId } = req.params
        const updatedBlog: IBlog | null = await Blog.findByIdAndUpdate(blogId, { title, body }, { runValidators: true, new: true })
        res.status(201).json({ updatedBlog })
    } catch (error) {
        next({ status: 500, message: error })
    }
}

export const deleteBlog = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { blogId } = req.params
        await Blog.findByIdAndDelete(blogId)
        res.status(204).json({ "message": "deleted" })
    } catch (error) {
        next({ status: 500, message: error })
    }
}