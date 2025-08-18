const jwt = require("jsonwebtoken");
const { Admin } = require("../model/user");

const adminAuth = async (req,res,next) => {
    
    try{
        const {token} = req.cookies;
        if(!token){
            throw new Error("token not found, signin please")
        }
        const decoded = jwt.verify(token, process.env.ADMIN_JWT_KEY);

        const {id} = decoded;

        const admin = await Admin.findById(id);

        req.admin = admin;
        next();

    }catch(err){
        res.status(401).send("ERROR: "+ err.message)
    }

}

module.exports = adminAuth 