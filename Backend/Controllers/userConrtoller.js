const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
    const { name, email, password } = req.body;



    try {

        // Check email already registered
        let user = await User.findOne({ email });
        if (user) {
            res.status(400).json({
                success: false,
                request: "Request Failed",
                message: "User with this email is already registered"
            })
        }

        user = new User({ name, email, password })
        await user.save();

        // Payload
        const payLoad = { user: { id: user?._id, role: user?.role } }

        // Sign in 
        jwt.sign(payLoad, process.env.SECRETKEY, { expiresIn: "24h" }, (err, token) => {
            if (err) throw err;

            res.status(201).json({
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role

                },
                token
            })
        })



    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");

    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email })
      
        if (!user) {
            return res.status(400).json({ success: false, message: "Password and email is incorrect", request: "Request Failed" });
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Password and email is incorrect", request: "Request failed" })
        }


        const payLoad = { user: { id: user._id, role: user.role } }

        jwt.sign(payLoad, process.env.SECRETKEY, { expiresIn: "40h" }, (err, token) => {
            if (err) throw err;

            res.status(201).json({
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                },
                token
            })
        })
    } catch (error) {

        console.error(error.message);
        return res.status(500).json({ success: false, message: "Password and email is incorrect", request: "Request failed" })

    }

}


module.exports = {register, login };