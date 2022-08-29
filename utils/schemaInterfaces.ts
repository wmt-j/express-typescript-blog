import mongoose from "mongoose"

export interface IUser {
    name: String,
    email: String,
    age: Number,
    status: Boolean,
    password: String
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