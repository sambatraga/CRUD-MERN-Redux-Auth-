import { Employe } from "../../../types/employeInterface";
import { employeAction } from ".";

export interface getAllEmployeAction 
{
    type    : employeAction.GETALLEMPLOYE,
    payload : Employe []
}

export interface createEmploye{

    type    : employeAction.CREATEEMPLOYE,
    payload : Employe[]
  

}

export interface getEmployeByIDAction{

    type    : employeAction.GETEMPLOYEBYID,
    payload : Employe
  

}

export interface deleteEmployeAction{

    type    :  employeAction.DELETEEMPLOYE,
    payload :  Employe[]

}

export interface updateEmployeAction {

    type : employeAction.UPDATEEMPLOYE,
    payload :  Employe[]

}

export type employeActionType = getAllEmployeAction | createEmploye | deleteEmployeAction | updateEmployeAction | getEmployeByIDAction