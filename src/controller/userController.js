const {Router} = require('express')
const { default: User } = require('../model/user');
const { UserCreationError } = require('../utils/errors');
import {encryptPassword,createUser} from '../service/userServices/user';



module.exports = () =>{
    const userApi = Router()
    
    userApi.get('/',(req,res)=>{
        console.log("Im handling get user Request")
        User.find()
        .then(data =>{
            res.status(200).json({
                data
            })
        })
        .catch(err =>{
            console.log(err)
            throw new UserCreationError("Unable to fetch Data")
        })

    })

    userApi.post('/',(req,res,next)=>{
        encryptPassword(req.body.password).then(hashedPassword  =>{
            createUser({
                ...req.body,
                password: hashedPassword
            }).then(data =>{
                res.status(201).json({
                    uuid:data,
                    message:"User created Successfully"
                })
            })
        })
        .catch(err =>{
            console.log(err)
            next(err)
        })
    })

    userApi.put('/:id',(req,res)=>{
        console.log("Im handling PUT user Request")
        res.json({
            message:"PUT USER" + req.params.id
        })
    })

    userApi.delete('/:id',(req,res)=>{
        console.log("Im handling DELETE user Request")
        res.json({
            message:"DELETE USER"+ req.params.id
        })
    })

    return userApi
}