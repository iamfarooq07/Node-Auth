// import User from "../Model/userModel.js";
// import bcrypt from "bcrypt"
// import jwt from "jsonwebtoken";

// export const SECRET_KEY = "f7A@9Kx!2Z#R^6$M%L*QyC_E2026";

// export const register = async (req, res) => {

//     const { name, email, password } = req.body;

//     const hashPassword = await bcrypt.hash(password, 10)

//     const user = await User.create({
//         name,
//         email,
//         password: hashPassword,
//         role: role || "user",
//     })

//     const token = jwt.sign(
//         {
//             userId: user.id,
//             role: user.role,
//         },
//         SECRET_KEY,
//         {
//             expiresIn: "24hr"
//         },
//     );

//     res.json({ token, role: user.role });
// };

// export const login = async (req, res) => {

//     const { email, password } = req.body;

//     const [user] = await User.find({ email })

//     const passwordMatch = await bcrypt.compare(password, user.password);

//     if (passwordMatch) {
//         const token = jwt.sign(
//             {
//                 userId: user.id,
//                 role: user.role,
//             },
//             SECRET_KEY,
//             {
//                 expiresIn: "24hr"
//             },
//         );
//         res.json({ token, role: user.role });
//     } else {
//         res.status(400).json({ message: "Password Not Match" })
//     }
// }

//-----------------

import User from "../Model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const SECRET_KEY = "f7A@9Kx!2Z#R^6$M%L*QyC_E2026";

// REGISTER
export const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Hash password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create user with role, default = "user"
        const user = await User.create({
            name,
            email,
            password: hashPassword,
            role: role || "user",  // agar role diya hai use karo
        });

        // Generate JWT with role included
        const token = jwt.sign(
            {
                userId: user._id,
                role: user.role,   // role included in token
            },
            SECRET_KEY,
            { expiresIn: "24h" }
        );

        res.json({ token, role: user.role });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

// LOGIN
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: "Password not match" });
        }

        // JWT with role included
        const token = jwt.sign(
            {
                userId: user._id,
                role: user.role,
            },
            SECRET_KEY,
            { expiresIn: "24h" }
        );

        res.json({ token, role: user.role });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};
