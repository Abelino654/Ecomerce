const jwt = require("jsonwebtoken");
const User = require("../Models/User");





const protect = async (req, res, next) => {
    let token;


    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {

        try {
            token = req.headers.authorization.split(" ")[1];
         
            const decoded = jwt.verify(token, process.env.SECRETKEY);

            req.user = await User.findById(decoded.user.id).select("-password");
            next();
        } catch (err) {
            console.error(err);
            return res.status(401).json({ success: false, request: "Request Failed", message: "Token validation failed" });
        }
    } else {
        return res.status(401).json({ success: false, request: "Request Failed", message: "No token founded" });
    }


}


// Admin route
const isAdmin = (req, res, next) => {
    if (req.user && req.user.role.toLowerCase() === "admin") {
        next()
    } else {
        return res.status(401).json({ success: false, request: "Request Failed", message: "User is not authorized for this action" })
    }
}

module.exports = { protect, isAdmin };