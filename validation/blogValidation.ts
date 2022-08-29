import { body, param } from "express-validator";
import Blog from "../models/blogModel";
import User from "../models/userModel";

export const newBlogCheck = () => [
    body('title').isLength({ min: 5, max: 50 }),
    body('body').isLength({ min: 10, max: 500 }),
    body('userId').isMongoId().custom(async (value) => {
        const user = await User.findById(value)
        if (!user) {
            throw new Error("No user exists with that id!")
        }
    })
]

export const updateBlogCheck = () => [
    param('blogId').isMongoId().custom(async value => {
        const blog = await Blog.findById(value)
        if (!blog) {
            throw new Error("No user exists with that id!")
        }
    })
]