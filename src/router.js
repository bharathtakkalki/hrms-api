const { Router } = require('express');
const userController = require('./controller/userController');
const middleware = require('./middleware');
const router = Router()

module.exports = () =>{

    router.use(middleware())

    router.use('/user',userController())
    router.use(function(err,req,res,next){
        const error = JSON.parse(err.message)
        console.log(error)
        //Response Generation
        res.status(error.statusCode).json({code:error.code,message:error.message})
    })

    return router;
}