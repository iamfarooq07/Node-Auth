import User from "../Model/userModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";


export const SECRET_KEY = "f7A@9Kx!2Z#R^6$M%L*QyC_E2026";


export const register = async (req, res) => {

    const { name, email, password } = req.body;

    const hashPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
        name,
        email,
        password: hashPassword
    })

    const token = jwt.sign(
        {
            userId: user.id
        },
        SECRET_KEY,
        {
            expiresIn: "24hr"
        },
    );

    res.json({ token })
};

export const login = async (req, res) => {

    const { email, password } = req.body;

    const [user] = await User.find({ email })

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
        const token = jwt.sign(
            {
                userId: user.id
            },
            SECRET_KEY,
            {
                expiresIn: "24hr"
            },
        );
        res.json({ token })
    } else {
        res.status(400).json({ message: "Password Not Match" })
    }
}