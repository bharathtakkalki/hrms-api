import {Router} from 'express';
import Roles from '../model/roles';
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

    rolesMiddleware.put('/:id',(req,res,next)=>{
        if(!req.body){
            throw new RolesCreationError("No Request body available")
        }
        const id = req.params.id
        Roles.findById(id)
        .then(data =>{
            if(!data){
                throw new RolesCreationError("Error in updation");
            }
            req.role = data.toJSON()
            next()
        })
        .catch(error =>{
            console.log("In Middleware",error)
            next(error.message)
        })
    })

    return rolesMiddleware
}