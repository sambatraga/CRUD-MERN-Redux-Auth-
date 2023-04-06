import axios from "axios"
import {FC, PropsWithChildren, useEffect, useLayoutEffect, useState} from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { bindActionCreators } from "redux"
import { actioncreatorsUser } from "../../state/actions"
import { RootState } from "../../state/reducers"

type Props = PropsWithChildren<{}>

export const RequireAuth:FC<Props> = ({children})=>{

     let navigate = useNavigate()    
     let {checkAuth} =  bindActionCreators(actioncreatorsUser, useDispatch())
     let connected = useSelector((state:RootState)=>state.user.loggined)

    useLayoutEffect(()=>{
        checkAuth();
    })

    if(connected === false)
    {
         navigate("/")   
    }


    

    return(
            <div>
                {children}
            </div>
            )
}