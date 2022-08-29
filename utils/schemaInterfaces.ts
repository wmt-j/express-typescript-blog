import { Request } from "express"
import mongoose from "mongoose"

export interface IUser {
    id?: String,
    name?: String,
    email?: String,
    age?: Number,
    deleted?: Boolean,
    password?: String
}

export interface IBlog {
    title: String,
    body: String,
    createdAt: Date,
    author: mongoose.Schema.Types.ObjectId
}

export interface IError {
    msg: String
}

export interface IGetUserAuthInfoRequest extends Request {
    user?: IUser
}