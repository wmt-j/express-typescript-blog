import { Response, NextFunction } from "express";
import Role from "../models/roleModel";
import User from "../models/userModel";
import { CustomError } from "../utils/customError";
import messages from "../utils/messages";
import { IGetUserAuthInfoRequest } from "../utils/schemaInterfaces";

function restrictTo(...roles: String[]) {
    return async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const user = await User.findById(req?.user?.id)
        let giveAccess = false
        for (let i = 0; user?.role && i < user?.role?.length; i++) {
            const userRole = await Role.findById(user?.role[i])
            console.log(userRole);
            if (userRole && roles.includes(userRole.name))
                giveAccess = true
            break
        }
        if (giveAccess) return next()
        next(new CustomError([messages.accessDenied], 401))
    }
}
export default restrictTo