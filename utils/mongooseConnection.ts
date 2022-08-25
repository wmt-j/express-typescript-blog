import mongoose from "mongoose";

export const connectionOfMongoose = mongoose.connect(<string>process.env.MONGODB_URL)
    .then((data) => { console.log("DB connected"); return data })
    .catch((err) => { console.log(err) })