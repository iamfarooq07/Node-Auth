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
    role: {
        type: "string",
        enum: ["user", "admin"],
        default: "user"
    }
})
// console.log(userSchema);

export default mongoose.model("User", userSchema)