import jwt from "jsonwebtoken"

import userModel from "../Model/userModel.js";
import { SECRET_KEY } from "../controller/userController.js";

export const middlewaer = async (req, res, next) => {
    // const header = req.headers || {}
    const { authorization } = req.headers || {};

    if (!authorization) {
        return res.status(402).send("Unauhtorize access")
    }

    const token = authorization.split(" ")[1];

    const jwtData = jwt.verify(token, SECRET_KEY)
    req.userId = jwtData.userId


    const user = await userModel.findById(jwtData?.userId);
    console.log(user);

    if (!user) {
        return res.status(402).send("Unauhtorize access")
    }

    next()
}