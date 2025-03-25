const express = require("express");
const Subscribe = require("../Models/Subscribe");
const router = express.Router();


// Create a new subscribe
router.post(("/") ,async (req, res) => {
    try {

        const { email } = req.body;

        if (!email) return res.status(400).json({ message: "Email is required" });

        const emailExist = await Subscribe.findOne({ email });
        if (emailExist) return res.status(400).json({ message: "Email is already registered" });


        const subscriber = new Subscribe({ email });
        await subscriber.save();

        return res.status(201).json({ message: "Subscribed Successfully", subscriber })


    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: "Internal Server Error" })
    }
})

module.exports =  router;