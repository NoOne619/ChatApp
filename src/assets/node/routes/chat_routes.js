
const express = require("express");
const multer = require('multer');

const fileFilter = (req, file, cb) => {
    const allowedTypes = [
    
        'image/jpeg', 
        'image/png', 
        'application/pdf', 
        'application/msword', 
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'audio/mp4a-latm',
        'audio/mpeg' ,
        'video/mp4',
        'audio/wav'
    
    ];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Unsupported file type'), false);
    }
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploadfile/'); // Specify the directory where files will be stored
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const mimeType = file.mimetype;
         fileExtension = mimeType.split('/').pop();
        if (fileExtension =='vnd.openxmlformats-officedocument.wordprocessingml.document') {
            fileExtension='docx';
        }
        else if(fileExtension=='mpeg'||fileExtension=='wav'){
            fileExtension='mp3';
        }
        file.originalname = uniqueSuffix + '.' + fileExtension;
        cb(null, file.originalname); // Use the generated file name
    }
});
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 20 } // Limit file size to 10MB
});


const { GetChat,InsertChat,uploadFile,GetRecentMessage} = require("../controller/chats");

const route = express.Router();
route.post("/insertchat", InsertChat ); 
route.get("/getchat",GetChat);
route.get("/getrecentmess",GetRecentMessage);
route.post("/uploadfile/:sender/:receiver", upload.single('file'), uploadFile); // Use upload.single('file') correctly


module.exports = route;

