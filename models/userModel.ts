import mongoose from 'mongoose'
import { IUser } from '../utils/schemaInterafaces'

const userSchema: mongoose.Schema = new mongoose.Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String },
    age: Number,
    status: { type: Boolean, default: false }
})

const User = mongoose.model<IUser>('User', userSchema)

export default User