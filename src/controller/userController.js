const {Router} = require('express')
const fs = require('fs');
const { default: User } = require('../model/user');
const { UserCreationError } = require('../utils/errors');



module.exports = () =>{
    const userApi = Router()
    
    userApi.get('/',(req,res)=>{
        console.log("Im handling get user Request")
        User.find()
        .then(data =>{
            res.statusCode(200).json({
                data
            })
        })
        .catch(err =>{
            console.log(err)
            throw new UserCreationError("Unable to fetch Data")
        })

    })

    userApi.post('/',(req,res)=>{
        const user = new User(req.body)
        user.save()
        .then(data =>{
            res.status(201).json({
                uuid:data,
                message:"User created Successfully"
            })
        })
        .catch(error =>{
            console.log(error)
            throw new UserCreationError("User Creation Failed")
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