const {Router} = require('express');
const userMiddleware = require('./userMiddleware');



module.exports = () => {

    const middleware =  Router()

    middleware.use('/user',userMiddleware())

    return middleware;
}