import productModel from "../Model/productModel.js";

const productPost = async (req, res) => {
    const product = await productModel.create(req.body);
    res.status(201).json(product);
}

const productPut = async (req, res) => {
    const product = await productModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json(product);
}

const productDelete = async (req, res) => {
    await productModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
}

export { productPost, productPut, productDelete }