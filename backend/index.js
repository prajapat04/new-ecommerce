import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { connectDB } from './config/connectDB.js';
dotenv.config();

import userRoutes from "./routes/user.routes.js";
import sellerRoutes from "./routes/seller.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import orderRoutes from "./routes/order.routes.js";
import addressRoutes from "./routes/address.routes.js"
import { connectCloudinary } from './config/cloudinary.js';
import { stripeWebhooks } from './controllers/order.controller.js';
const app = express();

app.set("trust proxy", 1);

await connectDB();
await connectCloudinary();


app.use(
  cors({
    origin: [
      "https://new-ecommerce-blue.vercel.app", "http://localhost:5173"// frontend
    ],
    credentials: true,
  })
);

app.use(cookieParser());
//middlewares
app.post('/stripe', express.raw({type: 'application/json'}), stripeWebhooks);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => res.send("API is Working"));






//api Endpointes

app.use("/images", express.static("uploads"));
app.use("/api/user", userRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/product", productRoutes); 
app.use("/api/cart", cartRoutes); 
app.use("/api/order", orderRoutes); 
app.use("/api/address", addressRoutes); 

const PORT=process.env.PORT || 4000;

app.listen(PORT, ()=> {
  console.log(`Server is runnig on ${PORT}`);

});








