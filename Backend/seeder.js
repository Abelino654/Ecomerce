const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const productData = require("./data/productData");
const Product = require("./models/Product")
const User = require("./models/User");
const Cart = require("./Models/Cart");


dotEnv.config();




// Connect to mongoDB
mongoose.connect(process.env.MONGO_URI);


const seedData = async (req, res) => {

    try {
        await Product.deleteMany();
        await User.deleteMany();
        await Cart.deleteMany(); 


        // Default admin user
        const createdUser = await User.create({
            name: "Admin user",
            email: "admin@example.com",
            password: "12345678",
            role: "admin"
        })


        const userID = createdUser._id






        const sampleProducts = productData.map((product) => {
            return { ...product, user: userID }
        })


        await Product.insertMany(sampleProducts);
        console.log("Data seeded successfully");
        process.exit();
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }

}

seedData();