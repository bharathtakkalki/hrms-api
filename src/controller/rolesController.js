import {Router} from 'express';
import { createRoles } from '../service/roleService/roles';
import { RolesCreationError } from '../utils/errors';



export default () =>{
    const rolesApi = Router()

    rolesApi.post('/',(req,res,next) =>{
        const role = req.body
        createRoles(role)
        .then(id => res.status(201).json({
            id,
            message:"Role Successfully Created"
        }))
        .catch(err => {
            console.log(err)
            next(new RolesCreationError("DB Error") )
        })

    })

    return rolesApi;
}