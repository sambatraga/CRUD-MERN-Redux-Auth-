import { Request, RequestHandler, Response } from "express";
import { User, UserModel } from "../models/userModels";
import jwt from "jsonwebtoken"
import bcrypt from 'bcryptjs';


export const signUp = async (req: Request, res : Response)=>{
    
        let user:User = req.body
            
        user.password = await  bcrypt.hash(user.password, 8 )
            
        const newUser = new UserModel(user);

        newUser.save()  .then((user)=>res.json(user))
                        .catch((err)=>{  
                                        console.log(err)
                                        res.sendStatus(400)
                                        })

}

export const logIn:RequestHandler = async (req, res )=>{

      
        let {email, password} = req.body
        //check if user exist
        let user = await UserModel.findOne({email})

        //retourner une erreur 401(bad request) si l'utilisateur n'existe pas
        if(!user) return res.sendStatus(401)

        //comparer les mdps
        let passwordMatch = bcrypt.compareSync(password, user.password);
        //si les passwords ne sont pas les mêmes
        if(!passwordMatch) return res.sendStatus(401)


        //créer un jwt token
        //expiration
        const exp = Date.now() + 1000*60*60*24;
    
        let token = jwt.sign({sub : user._id, exp}, "HJ5FD5FDFD8WER94ERGT4HYERH4Q4F157A5ASD5")
       
        res.cookie("Authorization", token, {expires: new Date(exp), httpOnly: true, sameSite: "lax", secure: false})

        res.send("OK")
        //envoyer le token
        // res.json({token})
   

}

export const logOut:RequestHandler = (req, res)=>{
        
       res.clearCookie("Authorization")

       res.send("deconnexion")
        //res.send("coucou")
       // console.log(req.cookies)
        //  console.log(JSON.stringify(req.cookies))
}

export const checkAuth = (req:any, res:Response)=>{
        res.json(req.user)
}