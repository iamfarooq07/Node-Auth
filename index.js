import express from "express";
import mongoose from "mongoose";

import { route } from "./routes/userRoutes.js";
import { authMiddleware } from "./Middlewear/authMiddlewear.js"

import productModel from "./Model/productModel.js";
import { authorizeRoles } from "./Middlewear/authorizeRoles.js";
import { productDelete, productPost, productPut } from "./controller/productController.js";
import multer from "multer";


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

// Add Multer   
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const upload = multer({ storage });

app.post("/upload", upload.single("image"), (req, res) => {
    console.log(req.file);
    res.send("File uploaded successfully");
});
// =================
// Read → User + Admin + Managernpm 
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

// Used → only [Admin, Manager]
app.post("/product", authMiddleware, authorizeRoles("admin", "manager"), productPost
);

app.put("/product/:id", authMiddleware, authorizeRoles("admin", 'manager'), productPut);

app.delete("/product/:id", authMiddleware, authorizeRoles("admin", "manager"), productDelete);

// ==========================

// Server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});


