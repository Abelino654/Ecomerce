const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require('./Config/conn');
// Config
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
connectDB();




// Importing routes
const userRoute = require("./routes/userRoute");
const productRouter = require("./routes/productRouter");
const cartRouter = require("./routes/cartRoute");
const checkoutRouter = require("./routes/checkout");
const orderRouter = require("./routes/orderRoute");
const uploadRouter = require("./routes/uploadRoute");
const subscribeRoute = require("./routes/subscribeRoute");
const adminRoute = require("./routes/adminRoute");
const stripeRoutes = require("./routes/stripe");
app.get("/", (req, res) => {
    res.send("Welcome to home Page");
})


app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/checkout", checkoutRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/upload", uploadRouter);
app.use("/api/v1/subscribe", subscribeRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/stripe", stripeRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on the http://localhost:${process.env.PORT}`);
})