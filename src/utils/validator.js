const validator =  require("validator")

const signupValidation = (req) => {
    const {
        firstName,
        emailId,
        password
    } = req.body


    if(!firstName){
        throw new Error("Enter FirstName")
    }else if(!validator.isEmail(emailId)){
        throw new Error("invalid email format")
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Weak password, create a stronger one")
    }
}

module.exports = signupValidation