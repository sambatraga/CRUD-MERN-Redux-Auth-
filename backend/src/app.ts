import bodyParser from "body-parser";
import express, { Request, Response }  from "express";
import mongoose from "mongoose";
import { routes } from "./routes/empRoutes";
import path from "path"
import cookieParser from 'cookie-parser'
import dotenv from "dotenv"
dotenv.config()
import cors, { CorsOptions } from "cors"

const app  = express();
const PORT = 2000;

const corsOptions: CorsOptions = {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  };
  
  

//connexion base de données
mongoose.connect("mongodb://localhost:27017/GestionEmploye");

//middlewares
app.use(cookieParser())
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(path.join(path.dirname(process.argv[1]), "/public")))

routes(app);

//telecharger une image depuis react
app.post("/upload", (req:any, res:Response)=>{
       console.log(req)
})  




app.listen(PORT, ()=>console.log(`cette appli écoute sur le port ${PORT}`))
