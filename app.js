import express from "express";
import mongoose from "mongoose";
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

        // validation
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.create({
            name,
            email,
            password,
        });

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
