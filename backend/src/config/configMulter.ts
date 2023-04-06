import multer from "multer";
import path from "path"

const stockage = multer.diskStorage({
    destination : (req, file, cb)=> {

        cb(null, path.join(path.dirname(process.argv[1]), '/public/')
            )
        
    },

    filename : (req, file, cb)=>{
        cb(null, `${Date.now()}.${file.mimetype.split("/")[1]}`);
    }

})

export const upload = multer({storage : stockage})