import QRCode from "qrcode.react"
import {FC, useState} from "react"
import { Employe } from "../../types/employeInterface"
import Modal from "@mui/material/Modal"
import Box from "@mui/material/Box";
import { style } from "./Header";

type Props = {
    employe:Employe, 
    openModal : boolean,
    fermer : (f:boolean)=>void
}

export const QrCodeModal:FC<Props> = ({employe, openModal, fermer})=>{


    const handleClose = ()=> {
            
        fermer(false)
    }
    return (
            <Modal 
                    open={openModal} 
                    onClose={handleClose} 
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                   
                    >
                     
               <Box  sx={{...style, width:180}}> 
                    <QRCode value={JSON.stringify(employe)}/>
                </Box>    
            </Modal>
    )   
            
    




}