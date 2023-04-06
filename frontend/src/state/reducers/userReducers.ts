import { userAction } from "../actions/action-type"
import { userActionType } from "../actions/action-type/userActionsInterfaces"

export interface userState {
        loggined : boolean | null

}

const initialUserState:userState = {
    loggined : null
}

export const userReducer = (state = initialUserState, action:userActionType):userState=>{

    switch(action.type)
    {       
            case userAction.CHECKAUTH  :
                return {...state, 
                         loggined : action.payload.loggined    
                        }                    
            default :
                return {...state}

    }

}