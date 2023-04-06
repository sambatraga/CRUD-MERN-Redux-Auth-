import {FC} from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { bindActionCreators } from "redux"
import { actioncreators } from "../../state/actions"
import { useDispatch } from "react-redux"

type DialogSuppressionType = {
        idSended :string
        ouvrir:boolean,
        fermer : (b:boolean)=>void
}

export const SuppressionDial:FC<DialogSuppressionType> = ({ouvrir=false, fermer, idSended})=>{

    const dispatch = useDispatch()

    const {deleteEmploye} = bindActionCreators(actioncreators, dispatch)

    const handleClose = () => {
        fermer(false)

    };

    const supprimer = ()=>{
        //console.log(idSended) 
         
        deleteEmploye(idSended)
         
        handleClose()
        
    }


    return (
        <>
        <Dialog
            open={ouvrir}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">
            {"Supprimer une ligne?"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Voulez-vous vraiment supprimer cette ligne?
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Annuler</Button>
            <Button onClick={supprimer} autoFocus>
                Accepter
            </Button>
            </DialogActions>
      </Dialog>
      </>
    )
}