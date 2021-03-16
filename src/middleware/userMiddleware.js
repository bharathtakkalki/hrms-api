const { Router } = require("express");
const { body, validationResult } = require("express-validator");
const { UserValidationError, UserCreationError } = require("../utils/errors");
const fs = require('fs');
const { default: User } = require("../model/user");
const { Console } = require("console");

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
    User.findOne({userName:req.body.userName,email:req.body.email})
    .then(data =>{
      if(!data) next()
      throw new Error("User exists "+JSON.stringify(req.body))
    })
    .catch(err =>{
      console.log(err)
      throw new UserCreationError("User already exists, Please sign in")
    })
  })


  return userMiddleware;
};
