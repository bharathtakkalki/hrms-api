import {Router} from 'express';


export default () =>{
    const authApi = Router()

    authApi.post('/login',(req,res) =>{
        console.log("Hanlde Login")
        res.json({
            message:"Handle Login"
        })
    })

    authApi.get('/logout',(req,res)=>{
        console.log("Hanlde logout")
    })

    return authApi;

}