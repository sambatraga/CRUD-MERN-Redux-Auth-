import mongoose from "mongoose";

export interface User {
    email : string
    password : string
}

const Schema = mongoose.Schema

const userSchema = new Schema<User>({
    email : {
                type : String,
                required : true,
                unique : true,
                lowercase : true,
                index: true
             
            },

    password : {
                type : String,
                required : true
    }        
})

export const UserModel = mongoose.model<User>("users", userSchema)