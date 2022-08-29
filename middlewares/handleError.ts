import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/customError";

function handleError(err: CustomError, req: Request, res: Response, next: NextFunction) {
    console.log(err)
    if (err instanceof CustomError) {
        return res.status(err.status).json({ messages: err.messages })
    }
    else {
        return res.status(500).json({ messages: ["Something Went Wrong."] })
    }
}

export default handleError