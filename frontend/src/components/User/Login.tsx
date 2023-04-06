import { Button, Stack, TextField } from "@mui/material";
import { FC, useEffect, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { actioncreatorsUser } from "../../state/actions";
import { RootState } from "../../state/reducers";
import { User } from "../../types/userInterface";
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"



export const LoginUser:FC = ()=>{

    const dispatch = useDispatch()

    let {userLogIn,checkAuth}  =  bindActionCreators(actioncreatorsUser, dispatch)

     let connected =  useSelector((state:RootState)=>state.user.loggined)

     let navigate = useNavigate()

    useLayoutEffect(()=>{
       checkAuth()
    }) 

    useEffect(()=>{
          if(connected===true){
            navigate("/employe")
          }
    }, [connected])
      
    const [user, setUser] =   useState<User>({
                email : "",
                password: ""
            })    

    const handleChange =  (e:React.ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault();

        const {name, value} = e.target;
        setUser({...user, [name] : value})
    }        
    
    const login = async()=>{
      // let res = await axios.post("/logIn", user, {withCredentials:true})
     await userLogIn(user);

      checkAuth()
      
    }

    return(
    
            <div style={{textAlign:"center", marginLeft:"40%", marginTop:"10%"}}>
              <Card variant="outlined" sx={{width: "35ch", height : "35ch", padding:"3ch"}}>
                <CardContent>
                    <Stack component="form" spacing={1} 
                          sx={{
                              width: '25ch',
                            }}
                          
                          > 
                          <TextField id="outlined-basic" name="email" onChange={handleChange} label="Email" variant="outlined" />
                          <TextField id="outlined-basic" name="password" onChange={handleChange} label="Password" variant="outlined" />
                          <Button variant="outlined" color="primary" onClick={login}>Submit</Button>
                          <Button variant="outlined" color="primary" onClick={()=>checkAuth()}>checkAuth</Button>
                    </Stack>
                </CardContent>    
              </Card>
            </div>
            )



}