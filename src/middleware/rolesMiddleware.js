import {Router} from 'express';
import { RolesCreationError } from '../utils/errors';
const { body, validationResult } = require("express-validator");


export default () =>{

    const rolesMiddleware = Router()


    rolesMiddleware.post('/',body('title').notEmpty().isLength({min:3,max:25}),(req,res,next) =>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          console.log("Roles data is invalid");
          throw new RolesCreationError(errors.errors);
        }
        next();
    })

    return rolesMiddleware
}