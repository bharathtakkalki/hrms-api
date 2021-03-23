import {Router} from 'express';
import { createDepartment, updateDepartment } from '../service/deptService/dept';
import { DeptCreationError, InternalServerError } from '../utils/errors';



export default () => {
    const deptApi = Router()

    deptApi.post('/',(req,res,next)=>{
        const dept = req.body
        createDepartment(dept)
        .then(id => res.status(201).json({
            id,
            message:"Department Sucessfully Created"
        }))
        .catch(error=>{
            console.log(error)
            next(new DeptCreationError("Dept creation unsuccessful"))
        })
    })

    deptApi.put('/:id',(req,res,next) => {
        const deptId = req.params.id
        updateDepartment(req.body,req.department)
        .then(id => res.status(200).json({
            id,
            message:"Successfully Updated"
        }))
        .catch(error => { console.log(error)
            next(new InternalServerError("Error in updation") )
        })
    })

    return deptApi;
}