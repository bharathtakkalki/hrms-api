const {Router} = require('express');
const { default: authMiddleware } = require('./authMiddleware');
const userMiddleware = require('./userMiddleware');



module.exports = () => {

    const middleware =  Router()

    middleware.use('/auth',authMiddleware())
    middleware.use('/user',userMiddleware())

    return middleware;
}