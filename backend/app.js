import express from 'express';
import productRoute from "./routes/product.route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productRoute)

export default app;