import express from "express";
import userController from "../controllers/userControllers";
import { validationError } from "../utils/errorHandler";
import { deleteUserCheck, newUserCheck, updateUserCheck } from "../validation/userValidation";
const router = express.Router()

router.get('/', userController.getAllUsers)
router.post('/', newUserCheck(), validationError, userController.newUser)

router.get('/:userId', userController.getOne)
router.patch('/:userId', updateUserCheck(), validationError, userController.updateUser)
router.delete('/:userId', deleteUserCheck(), validationError, userController.deleteUser)

export default router