import mongoose from "mongoose";
import { IBlog } from "../utils/schemaInterfaces";

const blogSchema: mongoose.Schema = new mongoose.Schema<IBlog>({
    title: { type: String, required: true },
    body: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

const Blog: mongoose.Model<IBlog> = mongoose.model<IBlog>('Blog', blogSchema)
export default Blog