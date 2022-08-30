import { body, check, param, ValidationChain } from "express-validator";
import Blog from "../models/blogModel";
import messages from "../utils/messages";

export const newBlogCheck = (): Array<ValidationChain> => [
    body('title').isLength({ min: 5, max: 50 }),
    body('body').isLength({ min: 10, max: 5000 })
]

export const updateBlogCheck = (): Array<ValidationChain> => [
    param('blogId').isMongoId().bail().custom(async value => {
        const blog = await Blog.findById(value)
        if (!blog) {
            throw new Error(messages.userMissing)
        }
    })
]