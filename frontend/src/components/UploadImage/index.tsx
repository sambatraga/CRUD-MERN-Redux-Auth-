import { Button, Stack, TextField } from "@mui/material";
import axios from "axios";
import { ChangeEvent, FC, useState } from "react";

export const UploadImg:FC = ()=>{

        const [file, setFile] = useState<File | null>()

        const handleImage = (e:ChangeEvent<HTMLInputElement>)=>{

                let file = e.target.files?e.target.files[0]:null

                 setFile(file)   


                // let reader = new FileReader();

                // reader.onloadend = ()=>{console.log(reader.result)};

                // if(file){
                //     reader.readAsDataURL(file)
                // }

        } 

        const upload = ()=>{
            console.log(file)

            let formdata = new FormData();

            if(file)
            {  
                formdata.append("image", file, )
                axios.post("/upload", formdata, {
                    headers: { 'Content-Type': 'multipart/form-data' }})
            }
        }

        return (
                <>
                     <div style={{textAlign:"center", marginLeft:"40%", marginTop:"10%"}}>

                        <Stack component="form" spacing={1} 
                            sx={{
                                width: '25ch',
                                }}
                            
                            > 
                            <TextField id="outlined-basic" name="email"  label="Email" variant="outlined" />
                            <TextField id="outlined-basic" name="password"  label="Password" variant="outlined" />
                            <input type="file" onChange={handleImage} />    
                           
                            <Button variant="outlined" color="primary" onClick={upload}>Submit</Button>
                           
                            {/* <Button variant="outlined" color="primary" >checkAuth</Button> */}
                        </Stack>
                        </div>
        
                </>)


} 