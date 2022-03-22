const jwt = require('jsonwebtoken');

const registrationValidations = (req, res, next)=>{
    const {password, confirmPassword} = req.body;
    if(password !== confirmPassword){
       return res.send('Password and Confirm password do not match')
    }else{
        next();
    }
}

const isUserAuthorized = (req, res, next)=>{
 const {token} = req.body;
 if(!token) {
    req.isUserValidated = false;
    next();
 }
 const isMatch = jwt.verify(token, "secretkeyshouldbeminimumofthirtytwocharacters");
 req.isUserValidated = isMatch;
 next();
}
module.exports = {registrationValidations, isUserAuthorized}