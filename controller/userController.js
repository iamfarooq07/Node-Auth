import User from "../Module/userModule.js";
import bcrypt from "bcrypt"

export const register = async (req, res) => {

    const { name, email, password } = req.body;

    const hashPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
        name,
        email,
        password: hashPassword
    })

    res.json(user)
};

export const login = async (req, res) => {

    const { email, password } = req.body;

    const [user] = await User.find({ email })

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
        res.json(user)
    } else {
        res.status(400).json({ message: "Password Not Match" })
    }
}