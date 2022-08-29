import { body, check, param } from "express-validator";
import Blog from "../models/blogModel";
import messages from "../utils/messages";

export const newBlogCheck = () => [
    body('title').isLength({ min: 5, max: 50 }),
    body('body').isLength({ min: 10, max: 5000 })
]

export const updateBlogCheck = () => [
    param('blogId').isMongoId().bail().custom(async value => {
        const blog = await Blog.findById(value)
        if (!blog) {
            throw new Error(messages.userMissing)
        }
    })
]