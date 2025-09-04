import Product from "../model/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
     try {
        const products = await Product.find({});
        res.json({success: true, data: [...products] });
    } catch (error) {
        console.error("Error fetching products:", error.message);
        res.status(500).json({ message: "Server Error" });
    }
}

export const createProduct = async (req, res) => {
    const product = req.body;
    if(product.name && !product.price && !product.image) {
        return res.status(400).json({ message: "Product name, price, and image are required." });
    }

    const newProduct = new Product(product);
    try{
        const savedProduct = await newProduct.save();
        res.status(201).json({success: true, data: { ...savedProduct._doc }});
    }catch(error){
        console.error("Error saving product:", error.message);
        res.status(500).json({ message: "Server Error"});
    }
}

export const updateProductById = async (req, res) => {
    const { id } = req.params;
    const product = req.body;
    const isProduct = await Product.findById(id);
    if(!isProduct || !mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "product is not found"})
    }
    try {
        const updateProduct = await Product.findByIdAndUpdate(id, product, {new: true});
        res.status(200).json({ success: true, data: updateProduct});
    }catch (error){
        res.status(500).json({success: false, message: "Server error"});
    }
}

export const deleteProductById = async (req, res) => {
 const { id } = req.params;
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error.message);
        return res.status(500).json({ message: "Server Error" });
    }
}