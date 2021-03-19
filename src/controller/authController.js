import {Router} from 'express';
import {comparePassword,generateAccessToken} from '../service/authService/auth';

export default () =>{
    const authApi = Router()

    authApi.post('/login',(req,res) =>{
        console.log("User Context",req.user)
        comparePassword(req.body.password,req.user.password)
        .then(isEqual => {
            if(!isEqual) throw new AuthenticationError({code:"ATH-03",message:"Password is incorrect"})
            generateAccessToken(req.user)
            .then(accessToken => {
                res.setHeader('Authorization',`Bearer ${accessToken}`)
                res.status(200).json({
                    id:req.user._id
                })
            })
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
    })

    authApi.get('/logout',(req,res)=>{
        console.log("Hanlde logout")
    })

    return authApi;

}