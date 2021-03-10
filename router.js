const { Router } = require('express');
const userController = require('./controller/userController');

const router = Router()

module.exports = () =>{


    router.use('/user',userController())

    return router;
}