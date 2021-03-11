const { Router } = require("express");
const { body, validationResult } = require("express-validator");
const { UserValidationError } = require("../utils/errors");

module.exports = () => {
  const userMiddleware = Router();

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

  return userMiddleware;
};
