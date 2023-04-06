import nodemailer, { Transporter } from 'nodemailer'
import { Request, Response } from 'express'

export const sendmail = async(req : Request, res : Response)=>{

    console.log(req.file)

    let testAccount:any = await nodemailer.createTestAccount()

    let transporter:Transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port : 587,
        secure : false,
        auth : {
            user : testAccount.user,
            pass : testAccount.pass
        }
    })

    let pieceJointe = {
                        filename : req.file?.filename,
                        path :req.file?.path,
                        contentType : `image/${(req.file?.mimetype)?.split("/")[1]}`}

    let message = { ...req.body,html : `<h1>${req.body.text}</h1>` ,attachments : [pieceJointe] }

    // console.log(message)
    console.log(pieceJointe)

    transporter.sendMail(message,(err:Error | null, info:any )=>{
        if(err)
        {
            console.log("Erreur lors de l'envoie", err);
            res.send("erreur")
        }

        else{
            // console.log("message envoyé avec succès ", info)
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            res.send("succès")
        }


   })
}