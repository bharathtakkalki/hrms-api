const {Router} = require('express')
const { default: User } = require('../model/user');
const { UserCreationError, InternalServerError } = require('../utils/errors');
import {encryptPassword,createUser,userById} from '../service/userServices/user';
import {authenticate} from '../service/authService/auth';
import { createProfile } from '../service/userServices/userProfile';


module.exports = () =>{
    const userApi = Router()

    userApi.get('/',authenticate,(req,res)=>{
        console.log("Im handling get user Request",req.user)
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

    userApi.get('/:id',authenticate,(req,res,next)=>{
        console.log(req.params.id)
        userById(req.params.id)
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(error =>{
            console.log(error)
            next(new InternalServerError("Unable to fetch"))
        })
    })
    
    userApi.post('/',async (req,res,next)=>{
        const userProfile = {...req.body.userProfile}
        const userProfileId = await createProfile(userProfile)
        const user = {...req.body,userProfile:userProfileId}
        encryptPassword(req.body.password).then(hashedPassword  =>{
            createUser({
                ...user,
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