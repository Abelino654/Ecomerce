const Product = require("../Models/Product");


const addProduct = async (req, res) => {


    try {
        const { name, description, price, discountPrice, countInStock, category, brand, sizes, colors, collections, material, gender, images, isFeatured, isPublished, tags, weight, sku } = req.body;

        const product = new Product({ name, description, price, discountPrice, countInStock, category, brand, sizes, colors, collections, material, gender, images, isFeatured, isPublished, tags, weight, sku, user: req.user._id })
        const createdProduct = await product.save();

        res.status(201).json(createdProduct)
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }


}



const updateProduct = async (req, res) => {

    try {
        const { id } = req.params; //  Get product ID from URL params

        //  Check if Product Exists
        let product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        //  Update Product Fields from `req.body`
        product.name = req.body.name || product.name;
        product.description = req.body.description || product.description;
        product.price = req.body.price || product.price;
        product.discountPrice = req.body.discountPrice || product.discountPrice;
        product.countInStock = req.body.countInStock || product.countInStock;
        product.category = req.body.category || product.category;
        product.brand = req.body.brand || product.brand;
        product.sizes = req.body.sizes || product.sizes;
        product.colors = req.body.colors || product.colors;
        product.collections = req.body.collections || product.collections;
        product.material = req.body.material || product.material;
        product.gender = req.body.gender || product.gender;
        product.images = req.body.images || product.images;
        product.isFeatured = req.body.isFeatured || product.isFeatured;
        product.isPublished = req.body.isPublished || product.isPublished;
        product.tags = req.body.tags || product.tags;
        product.weight = req.body.weight || product.weight;
        product.sku = req.body.sku || product.sku;

        //  Save Updated Product
        const updatedProduct = await product.save();

        res.status(200).json(updatedProduct);

    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}



// Delete Product
const deleteProduct = async (req, res) => {


    try {

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(400).json({
                request: "Request Failed",
                success: "Success failed",
                message: "Product does not found"
            })
        }


        await product.deleteOne();


        res.json({
            request: true,
            success: "Success",
            message: "Product removed successfully"
        })
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            request: "Request Failed",
            success: "Success failed",
            message: "Internal Server Error"
        })
    }
}
const getFilterProducts = async (req, res) => {
    try {
        const { collection, size, color, gender, minPrice, maxPrice, sortBy, search, category, material, brand, limit } = req.query;

        let query = {};

        // Filters queries
        if (collection && collection.toLowerCase() !== "all") {
            query.collections = collection;
        }

        if (category && category.toLowerCase() !== "all") {
            query.category = category;
        }

        if (material) {
            query.material = { $in: material.split(",") };
        }

        if (brand) {
            query.brand = { $in: brand.split(",") };
        }

        if (size) {
            query.sizes = { $in: size.split(",") };
        }

        if (color) {
            query.colors = { $in: [color] };
        }

        if (gender) {
            query.gender = { $regex: `^${gender}$`, $options: "i" }; // Case-insensitive match
        }

        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice && !isNaN(minPrice)) {
                query.price.$gte = Number(minPrice);
            }
            if (maxPrice && !isNaN(maxPrice)) {
                query.price.$lte = Number(maxPrice);
            }
        }

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
            ];
        }

        let sort;
        if (sortBy) {
            switch (sortBy) {
                case "priceASC":
                    sort = { price: 1 };
                    break;
                case "priceDESC":
                    sort = { price: -1 };
                    break;
                case "popularity":
                    sort = { ratings: -1 };
                    break;
                default:
                    break;
            }
        }

        const fetchProducts = await Product.find(query).sort(sort).limit(Number(limit) || 10);
       
        res.status(200).json(fetchProducts);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, request: "Request Failed", message: "Internal server error" });
    }
};

// Get Similar products
const getSimilarProducts = async (req, res) => {
    try {

        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                request: "Request Failed",
                success: false,
                message: "Product not found."
            })
        }

        const similarProducts = await Product.find({
            _id: { $ne: id },
            category: product.category,
            gender: product.gender
        }).limit(4)


        return res.status(200).json(
            similarProducts
        )
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ success: false, request: "Request Failed", message: "Internal server error" });
    }
}


// Get Product by id
const getProductByID = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ request: "request failed", success: false, message: "No Product found" })
        }

        return res.status(200).json(
            product
        )
    } catch (err) {
        console.error(err.message)
        return res.status(500).json({
            request: "Request Failed",
            success: false,
            message: "Internal server error"
        })

    }
}



// Best seller
const bestSeller = async (req, res) => {
    try {
        const product = await Product.findOne().sort({ rating: -1 });

        if (!product) {
            return res.status(404).json({
                request: "Request Failed",
                success: false,
                message: "Product not found"
            })
        }

        return res.status(200).json(
            product
        )
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            request: "Request Failed",
            success: false,
            message: "Internal server error"
        })
    }
}



const newArrivals = async (req, res) => {
    try {

        const newArrivals = await Product.find({}).sort({ rating: -1 }).limit(8);
        return res.status(200).json(
            newArrivals
        )
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            request: "Request failed",
            success: false,
            message: "Internal server error",
        })
    }
}
module.exports = { addProduct, updateProduct, deleteProduct, getFilterProducts, getSimilarProducts, getProductByID, bestSeller, newArrivals };