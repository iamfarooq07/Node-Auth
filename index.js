import express from "express";
import mongoose from "mongoose";

import { route } from "./routes/userRoutes.js";
import { middlewaer } from "./Middlewear/authMiddlewear.js";
import { adminMiddleware } from "./Middlewear/adminMiddlewear.js";

const app = express();
const port = 4000;

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/restaurant")
    .then(() => console.log("DB Connected"))
    .catch(err => console.log(err));

// Public & user routes
app.use("/api", route);

// Example user-only route
app.get("/products", middlewaer, (req, res) => {
    res.send("Products for logged-in users");
});

// Admin-only route
app.get("/admin/dashboard", adminMiddleware, (req, res) => {
    res.send("Welcome Admin!");
});

app.get("/product", (req, res) => {
    res.send("Admin Products")
})


app.listen(port, () => {
    console.log("Server Listening on Port 4000");
});
