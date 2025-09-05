import express from 'express';
import productRoute from "./routes/product.route.js";
import path from 'path';

const app = express();
const __dirname = path.resolve();

if(process.env.NODE_ENV === 'production'){
    console.log(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
    app.use(express.static(path.join(__dirname, '/frontend/dist')))
    app.get('/{*any}',(req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
    })
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productRoute)

export default app;