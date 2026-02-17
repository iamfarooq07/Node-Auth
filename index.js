import express from "express";
import mongoose from "mongoose";

import { route } from "./routes/userRoutes.js";
import { authMiddleware } from "./Middlewear/authMiddlewear.js"
// import { adminMiddleware } from "./Middlewear/adminMiddlewear.js";

import productModel from "./Model/productModel.js";
// import { managerMiddleware } from "./Middlewear/managerMiddlewear.js";
import { authorizeRoles } from "./Middlewear/authorizeRoles.js";


const app = express();
const port = 4000;

app.use(express.json());

// DB Connection
mongoose
    .connect("mongodb://127.0.0.1:27017/restaurant")
    .then(() => console.log("DB Connected"))
    .catch(err => console.log(err));


app.use("/api", route);

/* =======================
   PRODUCT ROUTES
   ======================= */

// Read → User + Admin
app.get("/product", authMiddleware, async (req, res) => {
    const products = await productModel.find();
    res.json(products);
});

app.get("/product/:id", authMiddleware, async (req, res) => {
    const product = await productModel.findById(req.params.id);
    res.json(product);
});

/* =======================
   PRIVITE ROUTES
   ======================= */

// Create → Admin only
// app.post("/product", middlewaer, adminMiddleware, managerMiddleware, async (req, res) => {
//     const product = await productModel.create(req.body);
//     res.status(201).json(product);
// });
app.post(
    "/product",
    authMiddleware,
    authorizeRoles("admin", "manager"),
    async (req, res) => {
        const product = await productModel.create(req.body);
        res.status(201).json(product);
    }
);

// Update → Admin only
app.put("/product/:id", authMiddleware, authorizeRoles("admin", 'manager'), async (req, res) => {
    const product = await productModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json(product);
});

// Delete → Admin only
app.delete("/product/:id", authMiddleware, authorizeRoles("admin", "manager"), async (req, res) => {
    await productModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
});

// Server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});


