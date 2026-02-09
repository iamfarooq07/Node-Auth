// middlewares/adminMiddleware.js
import jwt from "jsonwebtoken";
import userModel from "../Model/userModel.js";
import { SECRET_KEY } from "../controller/userController.js";

export const adminMiddleware = async (req, res, next) => {
    try {
        const { authorization } = req.headers || {};

        if (!authorization) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        const token = authorization.split(" ")[1];

        // Verify JWT
        const jwtData = jwt.verify(token, SECRET_KEY);

        // Find user in DB
        const user = await userModel.findById(jwtData.userId);
        console.log(user);
        

        if (!user) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        // Check if user is admin
        if (user.role !== "admin") {
            return res.status(403).json({ message: "Forbidden: Admins only" });
        }

        // Attach user info to request
        req.user = user;

        next(); // allow access
    } catch (err) {
        console.error(err);
        return res.status(401).json({ message: "Invalid token" });
    }
};
