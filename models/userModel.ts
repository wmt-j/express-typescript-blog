import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { IUser } from '../utils/schemaInterfaces'

const userSchema: mongoose.Schema = new mongoose.Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    age: Number,
    deleted: { type: Boolean, default: false }
})

userSchema.pre('save', async function (next) {
    const hashedPassword = await bcrypt.hash(this.password, 12)
    this.password = hashedPassword
    next()
})

const User: mongoose.Model<IUser> = mongoose.model<IUser>('User', userSchema)

export default User