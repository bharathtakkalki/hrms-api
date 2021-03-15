const {Router} = require('express')
const fs = require('fs');
const { UserCreationError } = require('../utils/errors');


module.exports = () =>{
    const userApi = Router()

    userApi.get('/',(req,res)=>{
        console.log("Im handling get user Request")
        res.json({
            message:"GET USER"
        })
    })

    userApi.post('/',(req,res)=>{
        const user = req.body
        user['id'] =  Math.floor(Math.random() * 100);
        const allUserData = [...req.allUserData]
        allUserData.push(user)
        try{
            fs.writeFileSync('model/user.json',JSON.stringify(allUserData))
            res.status(201).json({
                message:"User created Successfully"
            })
        }catch(error){
            console.log(error)
            throw new UserCreationError("User Creation Failed")
        }
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