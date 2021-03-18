const { Router } = require('express');
const { default: authController } = require('./controller/authController');
const userController = require('./controller/userController');
const middleware = require('./middleware');
const router = Router()

module.exports = () =>{

    router.use(middleware())

    router.use('/auth',authController())
    router.use('/user',userController())
    router.use(function(err,req,res,next){
        const error = JSON.parse(err.message)
        console.log("Error",error )
        //Response Generation
        res.status(error.statusCode).json({code:error.code,message:error.message})
    })

    return router;
}