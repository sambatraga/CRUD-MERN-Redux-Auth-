import { Box, Button, Stack, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import React, { ChangeEvent, FC, useEffect, useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import { Employe, statusType } from "../../types/employeInterface";
import { bindActionCreators } from "redux";
import { actioncreators } from "../../state/actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../state/reducers";
import { convertDate } from "./converionDate";
import { Email } from "@mui/icons-material";



type Props = {
    operation : "save"| "update",
    open : (b:boolean) => void,

    idSended ?: string
}



export const Formulaire:FC<Props> = ({open, operation, idSended})=>{
  const dispatch = useDispatch()

  const {createEmploye, updateEmploye, getEmployeByID} = bindActionCreators(actioncreators, dispatch)

  const employe = useSelector((state:RootState) => state.employe)
 
  const [nom, setNom ] = useState<string>('');
  const [prenom, setPrenom ] = useState<string>('');
  const [email, setEmail ] = useState<string>('');
  const [date_naissance, setDate] = useState<string>("")
  const [sexe, setSexe ] = useState<string>('homme');
  const [status, setStatus ] = useState<statusType>({
      marie : false,
      parent : false
  })

  const [photos, setPhotos] = useState<File | null>(null)


  const handleClose = ()=>{
      open(false);
  }

  useEffect(()=>{

        if(operation === "update" && idSended){
           
           getEmployeByID(idSended);
              
        }


  }, [ operation])

  useEffect(()=>{
          if(operation === "update"){  
            if(employe.itemSelected)
              {  let emp : Employe = employe.itemSelected
              
                  setNom(emp.nom); setPrenom(emp.prenom);
                  setDate(convertDate(emp.date_naissance)); 
                  setSexe(emp.sexe);
                  setEmail(emp.email);
                  setStatus({marie : emp.status.marie, parent : emp.status.parent}) 
              }

          }
  },[employe.itemSelected, operation])

  const handleChangeNom = (e:React.ChangeEvent<HTMLInputElement>)=>{
      setNom(e.target.value);
        
  }

  const handleChangePrenom = (e:React.ChangeEvent<HTMLInputElement>)=>{
      setPrenom(e.target.value);
      
  }

  const handleChangeEmail = (e:React.ChangeEvent<HTMLInputElement>)=>{
      setEmail(e.target.value)
  }

  const handleChangeDate = (e:React.ChangeEvent<HTMLInputElement>)=>{
      setDate(e.target.value);
  }

  const handleChangeSexe = (e:React.ChangeEvent<HTMLInputElement>)=>{
      setSexe(e.target.value)

  }

  const handleStatus = (e:React.ChangeEvent<HTMLInputElement>)=>{

        let {name, checked} = e.target;
        setStatus({...status, [name]:checked})

  }

  const saveEmploye = ()=>{
      
      if(nom && prenom)
        {
          let employe :Employe = { nom : nom,date_naissance : date_naissance ,prenom : prenom, email : email, sexe : sexe, status:status, photos : photos };
          console.log(employe)

          createEmploye(employe)
  
        }
        
        handleClose()
  }
  
  const updateEmployeID = ()=>{

    if(nom && prenom)
    {
      let employe :Employe = {_id:idSended ,nom : nom,date_naissance : date_naissance ,prenom : prenom, email : email, sexe : sexe, status:status, photos : photos};
      console.log(employe)

      updateEmploye(employe)

    }
    handleClose()
  }

  const saveOrUpdate = ()=>{
      if(operation ==="save")
          saveEmploye();
      else
          updateEmployeID()    

  }

  const handleImage = (e:ChangeEvent<HTMLInputElement>)=>{
      if(e.target.files)
      {
          setPhotos(e.target.files[0])
      }

  }


   return (

           <div style={{marginLeft:25}}> 
              <Box
                component="form"
                sx={{
                "& .MuiTextField-root": { marginTop:2 }
                }}
                noValidate
                autoComplete="off"
              >
                  <div>
                      <TextField label = "Nom" size="small" name="" value={nom}  sx={{width:"30ch"}} onChange={handleChangeNom} />

                  </div>
                  <div>
                     <TextField label = "Prénoms" size="small" value={prenom} sx={{width:"30ch"}} onChange={handleChangePrenom} />
                  </div>  
                  <div>
                     <TextField label = "Email" size="small" value={email} sx={{width:"30ch"}} onChange={handleChangeEmail} />
                  </div>

                </Box>  
                   
                <div className="mt-2">
                    <input onChange={handleChangeDate} type="date" value={date_naissance} placeholder="Date de naissance" className="form-control" style={{width:200}}/>
                </div>

                <div className="mt-2">
                     <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">Sexe</FormLabel>
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue="homme"
                          value={sexe}
                          name="sexe"
                          row
                          onChange={handleChangeSexe} 
                         
                        >
                          <FormControlLabel name="sexe" value="homme" control={<Radio />} label="Homme"  />
                          <FormControlLabel name="sexe" value="femme" control={<Radio />} label="Femme" />
                
                        </RadioGroup>
                      </FormControl>
                  </div>
                   
                   <div className="">
                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">Status</FormLabel>
                            <FormGroup row >
                                <FormControlLabel control={<Checkbox name="marie" checked  = {status.marie}  onChange={handleStatus} />} label="Marié" />
                                <FormControlLabel control={<Checkbox name="parent" checked = {status.parent}  onChange={handleStatus} />} label="Avoir enfant" />
                              </FormGroup> 
                        </FormControl>
                    
                    </div> 
                    <div>
                        <input type="file" onChange={handleImage}/>
                    </div>
 

                    <div className="mt-2">
                        <Stack direction="row" spacing={2}>
                          <Button variant="outlined" color="error"   onClick={handleClose}>
                            Annuler
                          </Button>
                          <Button variant="outlined" color="primary" onClick={saveOrUpdate} >
                              { operation==="save"?"Enregistrer":"Mettre à jour"}
                          </Button>
                        </Stack>
                    </div>
                     
            </div>            

            
            )


} 