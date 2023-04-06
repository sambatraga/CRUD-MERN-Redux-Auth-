import { Employe } from "../../types/employeInterface";
import { employeActionType } from "../actions/action-type/employeActionsInterfaces";
import { employeAction } from "../actions/action-type";

export type employeState = {
          items : Employe[],
          itemSelected : Employe | null
}

const initialEmmploye:employeState = {
          items : [],
          itemSelected : null
}

export const employeReducer = (state = initialEmmploye  , action:employeActionType):employeState=>{

            switch(action.type)
            {
                   case employeAction.GETALLEMPLOYE :

                        return {...state, items : [...action.payload]}

                   case employeAction.GETEMPLOYEBYID :

                        return  {...state, itemSelected: action.payload}    

                   case employeAction.CREATEEMPLOYE :

                         return {...state, items :[...action.payload]};

                    case employeAction.UPDATEEMPLOYE:     
                         return {...state ,items : [...action.payload]}

                    case employeAction.DELETEEMPLOYE :

                         return {...state ,items : [...action.payload]}     
                            
                    default :
                         return {...state}
                        

            }

}