const jwt = require("jsonwebtoken")
const {User} = require("../model/user")

const userAuth = async (req,res,next) => {
    const {token} = req.cookies;

    try{
        if(!token){
            return res.status(401).send("Please login")
        }

        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const {id} = decoded;
            
        const user = await User.findById(id);

        req.user = user;
        next();
    }catch(err){
        res.status(403).send("ERROR: "+ err.message)
    }
}

module.exports = userAuth