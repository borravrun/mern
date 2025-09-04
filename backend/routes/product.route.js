import {Router} from "express";
import Product from "../model/product.model.js";
import mongoose from "mongoose";
import {createProduct, deleteProductById, getProducts, updateProductById} from "../controller/product.controller.js";

const router = Router();

router.get('/', getProducts);

router.post('/', createProduct);

router.put('/:id', updateProductById)

router.delete('/:id', deleteProductById)

export default router;