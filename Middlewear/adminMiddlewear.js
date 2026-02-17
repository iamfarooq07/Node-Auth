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

        const jwtData = jwt.verify(token, SECRET_KEY);

        const user = await userModel.findById(jwtData.userId);
        console.log(user);

        if (!user) {
            return res.status(401).json({ message: "Unauthorized access" });
        };

        if (user.role !== "admin") {
            return res.status(403).json({ message: "Admins only Can Access" });
        };
        req.user = user;

        next();
        
    } catch (err) {
        console.error(err);
        return res.status(401).json({ message: "Invalid token" });
    }
};
