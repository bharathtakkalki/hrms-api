const { Router } = require("express");
const { body, validationResult } = require("express-validator");
const { UserValidationError } = require("../utils/errors");
const fs = require('fs');

module.exports = () => {
  const userMiddleware = Router();

  // Post Data validation
  userMiddleware.post(
    "/",
    body("email").isEmail(),
    body("firstName").notEmpty().isLength({min:3,max:25}),
    body("userName").notEmpty().isLength({min:3,max:25}),
    (req, res, next) => {
      // validate post data
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log("User data is invalid");
        throw new UserValidationError(errors.errors);
      }
      next();
    }
  );

  // Get all Data 
  userMiddleware.post("/",(req,res,next)=>{
    try{
      const allUserDataString = fs.readFileSync('model/user.json').toString() 
      req['allUserData'] = allUserDataString ? JSON.parse(allUserDataString) : []
      next()
    }catch(error){
      console.log(error)
      throw new InternalServerError({code:"USR-05",message:"Users read failed"})
    }
  })


  return userMiddleware;
};
