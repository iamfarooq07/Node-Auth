import express from "express";
import mongoose from "mongoose";

import { route } from "./routes/userRoutes.js";

const app = express();
const port = 4000;

app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/restaurant").then(() => {
    console.log("DB Connected");
}).catch((err) => {
    console.log(err);

})

app.use(route)

app.listen(port, () => {
    console.log("Server Listen In Port 4000");

})