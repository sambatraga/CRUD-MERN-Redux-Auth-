import {combineReducers} from "redux"
import { Employe } from "../../types/employeInterface"
import { employeReducer, employeState } from "./employeReducer"
import { userReducer, userState } from "./userReducers"

export interface RootState {
    employe : employeState, 
    user : userState
}

export const reducers = combineReducers <RootState>({ employe : employeReducer, user: userReducer})