import User from "./Module/userModule.js";
import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt"

const app = express();
const port = 4000;

app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/restaurant").then(() => {
    console.log("DB Connected");
}).catch((err) => {
    console.log(err);

})

app.get("/", (req, res) => { res.send("Hello Would") });

app.post("/register", async (req, res) => {

    const { name, email, password } = req.body;

    const hashPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
        name,
        email,
        password: hashPassword
    })

    res.json(user)
})

app.post("/login", async (req, res) => {

    const { email, password } = req.body;

    const [user] = await User.find({ email })

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
        res.json(user)
    } else {
        res.status(400).json({ message: "Password Not Match" })
    }
})

app.listen(port, () => {
    console.log("Server Listen In Port 4000");

})