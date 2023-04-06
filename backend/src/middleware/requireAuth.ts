import { NextFunction, Request, Response } from "express"
import jwt, { decode } from "jsonwebtoken";
import { UserModel } from "../models/userModels";



export const requireAuth = async (req:any, res:Response, next: NextFunction)=>{
   

    //console.log(req.cookies.Authorization )
    try{
        //read off the token
        let token = req.cookies.Authorization;

        console.log(token)

        //decode le token
        let decoded = jwt.verify(token, "HJ5FD5FDFD8WER94ERGT4HYERH4Q4F157A5ASD5")
        
        //find user using decoded sub
        let user = await UserModel.findById(decoded.sub);

        if(!user) return res.sendStatus(401);

        //attach user to req

        req.user = user

        res.sendStatus(200)
        
        next()
    }
    catch(err){
        console.log(err);
        res.sendStatus(401)
    }
}