import { userAction } from ".";

export interface loginAction {

    type     : userAction.USERLOGIN
} 

export interface checkAuthAction {

    type     : userAction.CHECKAUTH
    payload : { loggined : boolean }

}
export interface logOutAction {

    type     : userAction.USERLOGOUT
   

} 

export type userActionType = loginAction | logOutAction | checkAuthAction