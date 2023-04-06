import  { FC, useEffect, useState } from "react";
import {DataGrid, GridColDef} from "@mui/x-data-grid"
import IconButton from "@mui/material/IconButton";
import { Update } from "@mui/icons-material"; 
import DeleteIcon from "@mui/icons-material/Delete"
import EmailIcon from "@mui/icons-material/Email"
import PrintIcon from "@mui/icons-material/Print"
import QrCodeIcon from "@mui/icons-material/QrCode"
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { useSelector } from "react-redux";
import { convertDate } from "./converionDate";
import { SuppressionDial } from "./SuppressionDial";
import { Box, Modal, Typography } from "@mui/material";
import { Formulaire } from "./Formulaire";
import { style } from "./Header";
import CircularProgress from "@mui/material/CircularProgress"
import { actioncreators } from "../../state/actions";
import { RootState } from "../../state/reducers";
import { Employe } from "../../types/employeInterface";
import { MailForm } from "./FormulaireMail";


import { printEmploye } from "./printEmploye";
import { QrCodeModal } from "./QrCodeEmploye";



export const Tableau:FC = ()=>{

    const columns:GridColDef[] = [

        {field:"id", headerName: "ID",width:50 },
        {field : "photos", headerName:"Photos", renderCell : (params:any)=>{

        
        
               let pdp1 = `http://localhost:2000/${params.row.photos}`
     
               let  pdp2 = 'http://localhost:2000/R.jpg'

              let pdp = params.row.photos!==undefined?pdp1:pdp2
            
        

          return  <div style={{height: 35, width: 35, borderRadius: "50%", borderStyle: "solid"}}>
                    <img style={{height: 35, width: 35, borderRadius: "50%"}} src={pdp} alt = { ''}/>
            </div>}
        },
        {field:"nom", headerName: "Nom"},
        {field:"prenom", headerName: "Prénoms"},
        {field:"email", headerName: "Email", width:200},
        {field : "sexe", headerName : "Sexe"},
        {field:"date_naissance", headerName:"Date de naissance", width:150},
        {field:"marie", headerName: "Marié(e)", width:70},
        {field:"parent", headerName: "Avoir des enfants"},
        {field: "Actions",width:160 ,renderCell : (params:any) => 
        <>
            <IconButton aria-label="delete" size="small" onClick={()=>{ openDialSupprimer(); setID(`${params.row._id}`)}}>
                <DeleteIcon fontSize="inherit" color="error" />
            </IconButton>
    
            <IconButton aria-label="update" size="small" onClick={()=> { openModalUpdate(); setID(`${params.row._id}`) }}>
                <Update fontSize="inherit" color="info" />
            </IconButton>  

            <IconButton aria-label="update" size="small" onClick={()=> { openModalMail(params);  }}>
                <EmailIcon color="secondary"/>
            </IconButton>   

            <IconButton aria-label="print" size="small" onClick={()=> { printEmploye(params);  }}>
                <PrintIcon color="info"/>
            </IconButton> 

            <IconButton aria-label="print" size="small" onClick={()=> { openQrCodeModal(params);  }}>
                <QrCodeIcon color="info"/>
            </IconButton> 
              
         </>
    }
    ]

    const dispatch = useDispatch() 

    const {getAllEmploye} = bindActionCreators(actioncreators, dispatch)
    
    const employes : Employe[] = useSelector((state : RootState)=>state.employe.items)
    
    const [openSupp, setOPenSupp] = useState<boolean>(false)

    const [openMail, setOpenMail] = useState<boolean>(false)

    const [open, setOpen] = useState<boolean>(false)    

    const [idSended, setID] = useState('')

    const [loading, setLoading] = useState<boolean>(true)
 
    //mail destinataire
   const [destinataire, setDestinataire] = useState<string>('')

   //qrCode
   const [openQr, setOpenQr] = useState<boolean>(false)
   const [rowEmp, setRowEmp] = useState<Employe>({} as Employe)


    useEffect( ()=>{
            
            getAllEmploye();  
     
    }, [])

    useEffect (()=>{
        setLoading(false)
    
    }, [employes])

    const openDialSupprimer = ()=>{
        setOPenSupp(true)
    }

   
    const openModalUpdate = ()=>{
        setOpen(true)
    }

    const openModalMail = (params:any)=>{
        setOpenMail(true);
        
        setDestinataire(params.row.email)

    }

    const openQrCodeModal = (params:any)=>{

        setOpenQr(true);
        let emp : Employe = params.row
        setRowEmp(emp)

        
            
    }

    const handleClose = ()=>{

        setOpen(false)
    }

    const rows = Object.values(employes).map((emp, index)=>{
            let parent = emp.status.parent?"Oui":"Non";
            let marie = emp.status.marie?"Oui":"Non";
            let  date_naissance = convertDate(emp.date_naissance) 
            return {...emp,id: index+1,parent:parent, date_naissance : date_naissance ,marie : marie }
})
        return<> 
        
                <div className="mt-2">
                    {loading===true ?<CircularProgress color="primary"/>:
                    
                             
                    <DataGrid 
                        autoHeight
                        columns={columns} rows= {rows} 
                        style = {{width: "100%"}}
                     />
                    }  
                        {/* Modal QrCode */}
                    <div >   
                         <QrCodeModal  employe={rowEmp} openModal = {openQr} fermer={(f)=>setOpenQr(f)} />
                    </div>
                    
                </div>
                
                <SuppressionDial idSended={idSended} ouvrir={openSupp} fermer= {(f)=>setOPenSupp(f)} />

                <MailForm open = {openMail} fermer = {(f)=>setOpenMail(f)}  destinataire = {destinataire}  />
                    {/* Modal */}
                    <Modal 
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="parent-modal-title"
                        aria-describedby="parent-modal-description"
                     >
                        <Box sx={style}>
                                <Typography style={{textAlign:"center"}} id="transition-modal-title" variant="h5" component="h2">
                                   FORMULAIRE MAJ
                                </Typography>  
                              <Formulaire operation="update" idSended={idSended} open = {(b)=> setOpen(b)} />
                        </Box>
                       
                    </Modal>

                
                

            </>
}