import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt"
import User from "./Module/userModule.js";

mongoose
    .connect("mongodb://127.0.0.1:27017/restaurant")
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log("DB Connection Error:", err));

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashPassword,
        });

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.post("/login", async (req, res) => {
    const { email, password } = req.body || {};

    const [user] = await User.find({ email });

    if (!user) {
        return res.status(400).send("User not found!");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
        res.json(user);
    } else {
        res.status(400).json({ message: "Password not match!" });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
