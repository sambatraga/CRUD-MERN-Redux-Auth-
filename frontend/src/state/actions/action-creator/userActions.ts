import axios from "axios"
import { Dispatch } from "redux"
import { User } from "../../../types/userInterface"
import { userAction } from "../action-type"
import { userActionType } from "../action-type/userActionsInterfaces"

export const userLogIn = (user:User)=>{
    return async(dispatch:Dispatch<userActionType>)=>{
      
            await axios.post("/logIn", user, {withCredentials: true}); 	

            dispatch({
                        type    : userAction.USERLOGIN 

            })

    }
}
export const checkAuth = ()=>{
    return async(dispatch:Dispatch<userActionType>)=>{
            let loggined :boolean;
            try{    
                await axios.get("/checkAuth",{withCredentials: true});
                loggined = true;
            }
            catch(err){
                loggined = false;
            }
        
         
            dispatch({
                        type    : userAction.CHECKAUTH,
                        payload : {loggined : loggined } 

            })

    }
}


export const userLogOut = ()=>{
    return async(dispatch:Dispatch<userActionType>)=>{
           
      
                await axios.get("/logOut", {withCredentials: true});
     
         
            dispatch({
                        type    : userAction.USERLOGOUT
                         } 

                        )

    
}
}

