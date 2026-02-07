import express from "express";
import { login, register } from "../controller/userController.js";

export const route = express.Router();


route.post("/register", register);

route.post("/login", login)