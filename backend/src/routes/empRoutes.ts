import { Express } from "express"
import { upload } from "../config/configMulter"
import { addEmploye, deleteEmploye, getAllEmployes, getEmployeByID, updateEmploye } from "../controllers/empControllers"
import { checkAuth, logIn, logOut, signUp } from "../controllers/userControllers"
import { requireAuth } from "../middleware/requireAuth"
import { sendmail } from "../middleware/sendmail"

export const routes = (app:Express)=>{

        app.route("/signUp")

            .post(signUp)

        app.route("/logIn")
            .post(logIn)   
            
        app.route("/logOut")
            .get(logOut)     

        app.route("/checkAuth")
            .get(requireAuth, checkAuth)    

         

        app.route("/employe")

            .get(getAllEmployes)
        
            .post(upload.single("photos"),addEmploye)
        
        app.route("/employe/:employeID")
            
            .get(getEmployeByID)
            
            .post(upload.single("photos"),updateEmploye)
            
            .delete(deleteEmploye)   
            
            
        //send mail
        app.route("/sendMail")
            .post(upload.single("piece"), sendmail)

} 