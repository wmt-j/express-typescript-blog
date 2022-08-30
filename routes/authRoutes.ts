import express, { Router } from "express";
import { signin, signup } from "../controllers/authController";
import { validationError } from "../utils/errorHandler";
import { signinCheck, signupCheck } from "../validation/authValidation";
const router: Router = express.Router()

router.post('/signup', signupCheck(), validationError, signup)

router.post('/signin', signinCheck(), validationError, signin)

export default router