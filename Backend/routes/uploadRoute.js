const express = require("express");
const multer = require("multer");

const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const { protect } = require("../middleWare/protect");
const router = express.Router();
// Confifure
require("dotenv").config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
})



// Multer setup in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });


// Upload file 
router.post("/", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "File required" })
        }



        // Stream upload to cloudinary
        const streamUpload = (fileBuffer) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream((error, result) => {
                    if (result) {
                        resolve(result)
                    } else {
                        reject(error)
                    }
                })

                //Convert file buffer to stream
                streamifier.createReadStream(fileBuffer).pipe(stream)
            })
        }

        //Call the stream upload functions
        const result = await streamUpload(req.file.buffer)


        // Return with upload image url
        res.json({
            imageUrl: result.secure_url
        })
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: "Internal server error" })

    }
})




module.exports = router;