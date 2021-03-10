const {Router} = require('express')

module.exports = () =>{
    const userApi = Router()

    userApi.get('/',(req,res)=>{
        console.log("Im handling get user Request")
        res.json({
            message:"GET USER"
        })
    })

    userApi.post('/',(req,res)=>{
        console.log("Im handling POST user Request")
        res.json({
            message:"POST USER"
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