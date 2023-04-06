import mongoose from "mongoose";

interface statusType {
    marie    : boolean,
    parent  : boolean  
}

interface Employe {
    nom    :string,
    prenom ?:string,
    date_naissance :Date,
    email ?:string, 
    sexe : string,
    status  : statusType,
    photos : string

}


const Schema = mongoose.Schema;
const employeSchema = new Schema<Employe>({
        nom:{
            type : String,
            required : true
        },

        prenom : {
            type : String
        },

        date_naissance : {
            type : Date,
            required : true
        },

        sexe : {
                type : String,
                required : true
        },    

        status : {
               marie :   {
                    type    : Boolean,
                    require : true
               },

               parent : {
                    type : Boolean,
                    require : true

               }

            
        },

        photos : {
                    type: String,
                
        },

        email: {
                type : String
        }
        
    


})

export const EmployeModel = mongoose.model<Employe>("employes",employeSchema)