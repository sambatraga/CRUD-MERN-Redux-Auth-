import {useRef} from 'react'
import {ChangeEvent, FC, useState} from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import SendICon from "@mui/icons-material/Send"
import CancelIcon from "@mui/icons-material/Cancel"
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import axios from 'axios'

interface mailInfo {
    to : string,
    subject : string,
    text : string,
    piece ?: File | null
}

type FormMailProps = {
    open   : boolean,
    fermer : (f : boolean)=>void,
    destinataire : string 
}

export const MailForm:FC<FormMailProps> = ({open, fermer, destinataire=''})=>{

    const fileUploadBtn = useRef<HTMLInputElement>(null)

    const [fileSelected, setFileSelected] = useState<File | undefined>()

    const handleClose = ()=>{
          fermer(false)
    }

    const [maili, setMailInfo]  = useState<mailInfo>({to: '', subject: '', text : ''})

    const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
        
        const {name, value} = e.target

        setMailInfo({...maili, to : destinataire ,[name]:value})

    }

    const sendMail = async ()=>{

       let res = await axios.post("/sendMail", {...maili, piece: fileSelected},  { headers: { 'Content-Type': 'multipart/form-data' }})
       
       console.log(res)
       
    }

    const handleClickUploadFile = ()=>{
          
        fileUploadBtn.current?.click()

    }

    const handleInputChange = (e:ChangeEvent<HTMLInputElement>)=>{

         const {files} = e.target
         
         if(files && files[0] )
          { 
            //console.log(files[0].name) 
            setFileSelected(files[0])
          }
         else
            setFileSelected(undefined)   

    }
    

    return (
            <Dialog open={open} >
                <DialogTitle>Envoyer un email</DialogTitle>

                <DialogContent>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            '& .MuiTextField-root': { width: '50ch' },
                        }}
                        >  
                        <TextField 
                                    value={`A ${destinataire} `}
                                    variant='standard'
                                    fullWidth
                                    margin='dense'
                                    disabled
                        />
                        <TextField 
                                    placeholder='Objet'
                                    variant='standard'
                                    fullWidth
                                    margin='dense'
                                    name='subject'
                                    onChange={handleChange}
                        />
                        <TextField 
                                    placeholder='Ecrire un message...'
                                    variant='outlined'
                                    multiline 
                                    margin='dense' 
                                    fullWidth rows='5'
                                    name='text'
                                    onChange={handleChange}
                                    
                                    />
                    </Box>
                    
                    <input type="file" ref={fileUploadBtn} style={{display:'none'}} onChange={handleInputChange} />    

                    <Button onClick={handleClickUploadFile}><AttachEmailIcon/>{fileSelected?.name}</Button>

                </DialogContent>

                <DialogActions>
                    <Button variant='contained' color='error' startIcon={<CancelIcon/>} onClick={handleClose}>Fermer</Button>
                    <Button variant='contained' endIcon={<SendICon/>} onClick={sendMail}>Envoyer</Button>
                </DialogActions>


            </Dialog>

    )


}