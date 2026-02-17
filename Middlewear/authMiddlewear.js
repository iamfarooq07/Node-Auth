import jwt from "jsonwebtoken";
import userModel from "../Model/userModel.js";
import { SECRET_KEY } from "../controller/userController.js";

export const authMiddleware = async (req, res, next) => {
    try {
        const { authorization } = req.headers || {};

        if (!authorization) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        const token = authorization.split(" ")[1];

        const jwtData = jwt.verify(token, SECRET_KEY);

        const user = await userModel.findById(jwtData.userId);

        if (!user) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        req.user = user;

        next();

    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};