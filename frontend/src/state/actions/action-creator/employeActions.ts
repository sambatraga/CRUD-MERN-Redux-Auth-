import { Employe } from "../../../types/employeInterface";
import { employeAction } from "../action-type";
import { employeActionType} from "../action-type/employeActionsInterfaces";
import axios from "axios";            
import { Dispatch } from "redux";
        

export const getAllEmploye  =  ()=>{
        
       return async (dispatch:Dispatch<employeActionType>)=>{
                try{  
                        let employes =  await fetchData()
                      
                        dispatch({
                                type  : employeAction.GETALLEMPLOYE,
                                payload : employes
                        })
                }
                catch(error:any){
                                console.log(error.message)

                         }
               }
       
}

export const getEmployeByID  =  (_id:string)=>{
        
        return async (dispatch:Dispatch<employeActionType>)=>{
                 try{  
                         let response =  await axios.get<Employe>(`/employe/${_id}`);
                         let employe : Employe  =  response.data
                       
                         dispatch({
                                 type  : employeAction.GETEMPLOYEBYID,
                                 payload : employe
                         })
                 }
                 catch(error:any){
                                 console.log(error.message)
 
                          }
                }
        
 }

export const createEmploye = (employe:Employe)=>(
       
        async (dispatch:Dispatch<employeActionType>)=>{

                        await axios.post(`/employe`,  employe, {
                                headers: { 'Content-Type': 'multipart/form-data' }} );
                        
                        let employes =  await fetchData()
                        
                        dispatch( 
                                {
                                        type    : employeAction.CREATEEMPLOYE,
                                        payload : employes
                                })
                        }
                        
)

export const deleteEmploye = (_id:string) => ( async (dispatch:Dispatch<employeActionType>)=>{

                        await axios.delete(`/employe/${_id}` );

                        let employes =  await fetchData()
                        
                        dispatch( 
                                {
                                        type    : employeAction.DELETEEMPLOYE,
                                        payload : employes
                                })
                        })


export const updateEmploye = (employe:Employe)=>(async (dispatch:Dispatch<employeActionType>)=>{

                        await axios.post(`/employe/${employe._id}`,employe , { headers: { 'Content-Type': 'multipart/form-data' }} );

                        let employes =  await fetchData()
                        
                        dispatch( 
                                {
                                        type    : employeAction.UPDATEEMPLOYE,
                                        payload : employes
                                })
                        }
                        )
                        

const fetchData = async()=>{
         
        let response =  await axios.get<Employe[]>("/employe");
        let employes : Employe[]  =  response.data
        return employes
}