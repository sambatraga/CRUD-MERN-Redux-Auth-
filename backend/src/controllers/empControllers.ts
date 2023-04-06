import { Request, Response } from "express"
import { EmployeModel } from "../models/empModels"


export const addEmploye = (req : Request, res : Response)=>{
        
       let newEmploye = new EmployeModel({...req.body, photos: req.file?.filename});
       // console.log(req.file?.filename)
       // console.log(path.dirname(process.argv[1]))
       console.log({...req.body, photos: req.file?.filename})
        newEmploye.save() 
                        .then((employe)=>res.json(employe))
                        .catch((err)=>res.json(err));

}

export const getAllEmployes = async (req : Request, res : Response)=>{
       
        let listeEmploye = await EmployeModel.find().exec();

        res.json(listeEmploye);

}

export const getEmployeByID= async (req : Request, res : Response)=>{
       
        await EmployeModel.findById(req.params.employeID).exec().then((employe)=>{res.json(employe)});


}

export const updateEmploye  = async (req: Request, res : Response)=>{
        console.log(req)
        await EmployeModel.findOneAndUpdate({_id : req.params.employeID}, {$set : {...req.body, photos: req.file?.filename}}).exec();

        getAllEmployes(req, res);


}

export const deleteEmploye = async (req: Request, res : Response)=>{

        //console.log(req.params.employeID)
        
        await EmployeModel.findOneAndDelete({_id : req.params.employeID}).exec();

        getAllEmployes(req, res);


}

