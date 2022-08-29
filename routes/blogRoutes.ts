import express, { Router } from "express";
import { deleteBlog, getAll, getOne, newBlog, updateBlog } from "../controllers/blogControllers";
import restrictTo from "../middlewares/accessControl";
import verifyToken from "../middlewares/verifyToken";
import { validationError } from "../utils/errorHandler";
import { newBlogCheck, updateBlogCheck } from "../validation/blogValidation";
const router: Router = express.Router()

router.get('/', getAll)

router.post('/', newBlogCheck(), validationError, verifyToken, restrictTo('editor', 'admin'), newBlog)

router.get('/:blogId', getOne)

router.patch('/:blogId', updateBlogCheck(), validationError, verifyToken, updateBlog)

router.delete('/:blogId', verifyToken, deleteBlog)


export default router