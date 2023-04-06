import {useState} from "react"
import Button from "@mui/material/Button"
import Modal from "@mui/material/Modal"
import { Formulaire } from "./Formulaire"
import {Box} from "@mui/material"
import Typography from "@mui/material/Typography"
import {bindActionCreators}  from "redux"
import {useDispatch} from "react-redux"
import { actioncreatorsUser } from "../../state/actions"
import {useNavigate} from "react-router-dom"

export const style = {
    position: 'absolute' as 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 375,
    bgcolor: 'background.paper',
    border: '2px #000',
    borderRadius : "5px",
    boxShadow: 24, 
    p: 3

  };
export const Header = ()=>{
        const [open, setOpen] = useState<boolean>(false)   
        
       const {userLogOut, checkAuth} = bindActionCreators(actioncreatorsUser, useDispatch())

       const navigate = useNavigate()
       

        const openModal = ()=>{
            setOpen(true)
        }

        const handleClose = ()=>{

            setOpen(false)
        }

        const logout = async()=>{

            await userLogOut();

            checkAuth()


            
        }

        return (
            <>
                <div style={{marginTop:10}}>
                    <Button  variant="outlined" onClick={openModal} color="primary">Ouvrir la formulaire</Button>
                    <Button sx={{marginLeft: "10px"}} variant="outlined" onClick={logout} color="secondary" >Log Out</Button>
                    <Modal 
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="parent-modal-title"
                        aria-describedby="parent-modal-description"
                     >
                        <Box sx={style}>
                                <Typography style={{textAlign:"center"}} id="transition-modal-title" variant="h5" component="h2">
                                   FORMULAIRE
                                </Typography>  
                              <Formulaire operation="save" open = {(b)=> setOpen(b)} />
                        </Box>
                       
                    </Modal>
                </div>
                
            </>

        )

} 