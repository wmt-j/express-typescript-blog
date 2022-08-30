import express from 'express'
import { resendOtp, verifySignup } from '../controllers/verifyControllers'
import { validationError } from '../utils/errorHandler'
import { verifyResendOtpCheck, verifySignupCheck } from '../validation/verifyValidation'
const router = express.Router()

router.post('/signup', verifySignupCheck(), validationError, verifySignup)

router.post('/resend-otp', verifyResendOtpCheck(), validationError, resendOtp)

export default router