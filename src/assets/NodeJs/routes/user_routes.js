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


// Initialize Multer with configured storage
//const upload = multer({ storage: storage });

const route = express.Router();
const {  uploadFile,GetChat,InsertChat, GetRecentMessage,UploadStatus,GetStatus,DeleteStatus,GetallStatus } = require("../controlar/user");

// route.route("/insertinclass").post(PostUserData);
// route.route("/getuserdata").get(GetUserData);
// route.route("/deletedata/:classID").delete(DeleteData);

//route.post("/uploadfile", upload.single('file'), uploadFile); // Use upload.single('file') correctly

//route.post("/uploadfiles", upload.array('files',2), UploadMultiFiles); // Use upload.single('file') correctly



//route.route("/updatedata").put(UpdateData);
//route.route("/getteacherclasses").get(GetTacherClasses);
//route.route("/getfiles").get(GetFiles);
route.post("/insertchat", InsertChat ); 
route.route("/getchat").get(GetChat);
route.route("/getrecentmess").get(GetRecentMessage);
route.post("/uploadfile/:sender/:receiver", upload.single('file'), uploadFile); // Use upload.single('file') correctly
route.post("/uploadstatus/:sender", upload.single('file'), UploadStatus); 
route.get('/getstatus/:sender',GetStatus)
route.get('/getallstatus',GetallStatus)

route.delete('/deletestatus/:sender',DeleteStatus);
module.exports = route;
