import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: "string",
    email: {
        type: "string",
        require: true,
        unique: true,
    },
    password: {
        type: "string",
        require: true,
    },
})

export default mongoose.model("User", userSchema)