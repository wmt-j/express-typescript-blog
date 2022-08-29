import { NextFunction, Request, Response } from "express"
import { Result, ValidationError, validationResult } from "express-validator"
import { CustomError } from "./customError"

export const validationError = (req: Request, res: Response, next: NextFunction) => {
    const errors: Result<ValidationError> = validationResult(req)
    if (!errors.isEmpty()) {
        throw new CustomError(errors.array().map(error => error.msg), 400)
    }
    next()
}