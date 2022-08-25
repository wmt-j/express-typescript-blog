import express from "express";
import userController from "../controllers/userControllers";
import { deleteUserCheck, newUserCheck, updateUserCheck } from "../validation/inputValidation";
const router = express.Router()

router.get('/', userController.getAllUsers)
router.post('/', newUserCheck(), userController.newUser)

router.get('/:userId', userController.getOne)
router.patch('/:userId', updateUserCheck(), userController.updateUser)
router.delete('/:userId', deleteUserCheck(), userController.deleteUser)

export default router