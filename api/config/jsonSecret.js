require("dotenv").config();

const jsonSecret = {
    secret: process.env.SECRET
} 

module.exports = jsonSecret;