const express = require("express");
const route = express.Router();
const {register, login} = require("../Controllers/userConrtoller");

route.post("/register", register)
route.post("/login", login)

module.exports = route;