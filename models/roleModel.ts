import mongoose from 'mongoose'
import { IRole } from '../utils/schemaInterfaces'

const roleSchema = new mongoose.Schema<IRole>({
    name: {
        type: String,
        required: true
    },
    user: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }]
})

const Role = mongoose.model<IRole>('Role', roleSchema)
export default Role