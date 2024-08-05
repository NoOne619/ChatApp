const db = require("../db/connection");

// const GetUserData = async (req, res) => {
//     console.log("Test");
//     const sql = "SELECT * FROM `students`";
//     db.query(sql, (err, result) => {
//         if (err) {
//             console.error('Error retrieving data:', err);
//             return res.status(500).json({ error: 'Internal Server Error' });
//         }
//         res.status(200).json(result);
//     });
// };

// const PostUserData = (req, res) => {
//     const { CourseID, TeacherID, Semester, Year } = req.body;

//     const sql = "INSERT INTO `classes` (`CourseID`, `TeacherID`, `Semester`, `Year`) VALUES (?, ?, ?, ?)";
//     const values = [CourseID, TeacherID, Semester, Year];
//     console.log(values);
//     db.query(sql, values, (err, result) => {
//         if (err) {
//             console.error('Error inserting data:', err);
//             return res.status(500).json({ error: 'Internal Server Error' });
//         }
//         res.status(200).json({ message: 'Data inserted successfully', insertedID: result.insertId });
//     });
// };

// const DeleteData = (req, res) => {
//     const classID = req.params.classID; // Assuming classID is passed as a route parameter
    
//     const sql = "DELETE FROM `classes` WHERE classID = ?";
//     const values = [classID];

//     db.query(sql, values, (err, result) => {
//         if (err) {
//             console.error('Error deleting class:', err);
//             return res.status(500).json({ error: 'Internal Server Error' });
//         }

//         if (result.affectedRows === 0) {
//             return res.status(404).json({ error: 'Class not found' });
//         }

//         res.status(200).json({ message: 'Class deleted successfully' });
//     });
// };

// const UpdateData = (req, res) => {
//     const { classID, CourseID, TeacherID, Semester, Year } = req.body;
//     const sql = 'UPDATE `classes` SET CourseID = ?, TeacherID = ?, Semester = ?, Year = ? WHERE classID = ?';
//     const values = [CourseID, TeacherID, Semester, Year, classID];
//     db.query(sql, values, (err, result) => {
//         if (err) {
//             console.error('Error updating class:', err);
//             return res.status(500).json({ error: 'Internal Server Error' });
//         }
//         if (result.affectedRows === 0) {
//             return res.status(404).json({ error: 'Class not found' });
//         }
//         res.status(200).json({ message: 'Class updated successfully' });
//         console.log('updated successfully');
//     });
// };

// const GetTacherClasses = (req, res) => {
//     const sql = 'SELECT DISTINCT(courses.CourseName) as CName, teachers.FirstName as TName FROM courses JOIN classes ON courses.CourseID = classes.CourseID JOIN teachers ON classes.TeacherID = teachers.TeacherID';
//     db.query(sql, (err, result) => {
//         if (err) {
//             console.error('Error retrieving teacher classes:', err);
//             return res.status(500).json({ error: 'Internal Server Error' });
//         }
//         res.status(200).json(result);
//     });

// };

// const uploadFile = (req, res) => {
//     const file = req.file;
//     if (!file) {
//         return res.status(400).send('No file uploaded.');
//     }

//     const filename = file.originalname;
//     const sql = 'INSERT INTO files (name) VALUES (?)';

//     db.query(sql, [filename], (err, result) => {
//         if (err) {
//             console.error('Error inserting file into database:', err);
//             return res.status(500).send('Error inserting file into database.');
//         }

//         console.log('File inserted successfully:', filename);
//         res.status(200).send({filename});
//     });
// };
// const GetFiles=(req,res)=>{
//     const sql='SELECT name FROM files';
//     db.query(sql,(err,result)=>{
//      if (err) {
//          console.error('Error retrieving data:', err);
//          return res.status(500).json({ error: 'Internal Server Error' });
//      }
//      res.status(200).json(result);
//     })             
//  }
 
// const UploadMultiFiles = (req, res) => {
//     const files = req.files; // Assuming req.files contains an array of uploaded files

//     // Array to store promises for each database insert operation
//     const insertPromises = [];

//     // Iterate over each file
//     files.forEach(file => {
//         const sql = 'INSERT INTO files (name) VALUES (?)';
//        // const destination = "uploadfile/";
//         const fileName =  file.originalname;

//         // Create a promise for each db query
//         const insertPromise = new Promise((resolve, reject) => {
//             db.query(sql, [fileName], (err, result) => {
//                 if (err) {
//                     console.error('Error inserting file:', err);
//                     reject(err); // Reject promise on error
//                 } else {
//                     resolve(result); // Resolve promise on success
//                 }
//             });
//         });

//         insertPromises.push(insertPromise); // Push promise to array
//     });

//     // Execute all promises and handle responses
//     Promise.all(insertPromises)
//         .then(results => {
//             res.send("Files uploaded successfully");
//         })
//         .catch(err => {
//             console.error('Error inserting files:', err);
//             res.status(500).json({ error: 'Internal Server Error' });
//         });
      
// };

//---------------------------------------------for chat app--------------------------
const uploadFile = (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).send('No file uploaded.');
    }

    const filename = file.originalname;
    
    const imgsrc = '../../../assets/NodeJs/uploadfile/';
    const  message=imgsrc+filename;
    const sender=req.params.sender;
    const receiver=req.params.receiver;
    
    const values=[message,sender,receiver,true];
  
      const sql='INSERT INTO `chat` (`message`, `sender`,`receiver`,`filebool`) VALUES (?, ?,?,?)';
      db.query(sql,values,(err,result)=>{
       if (err) {
           console.error('Error retrieving data:', err);
           return res.status(500).json({ error: 'Internal Server Error' });
       }
       res.status(200).json(result);
      })
};


const GetChat=(req,res)=>{
    const sql='SELECT *  FROM chat';
    db.query(sql,(err,result)=>{
     if (err) {
         console.error('Error retrieving data:', err);
         return res.status(500).json({ error: 'Internal Server Error' });
     }
     res.status(200).json(result);
    })             
 }
 const InsertChat=(req,res)=>{
  const  {message,sender,receiver}=req.body;
  const values=[message,sender,receiver];

    const sql='INSERT INTO `chat` (`message`, `sender`,`receiver`) VALUES (?, ?,?)';
    db.query(sql,values,(err,result)=>{
     if (err) {
         console.error('Error retrieving data:', err);
         return res.status(500).json({ error: 'Internal Server Error' });
     }
     res.status(200).json(result);
    })             
 }
 const GetRecentMessage=(req,res)=>{
    const sql ="SELECT  * from chat order by id DESC LIMIT 1";
    db.query(sql,(err,result)=>{
        if (err) {
            console.error('Error retrieving data:', err);
         return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(200).json(result);
    })
 }
const UploadStatus=(req,res)=>{
    const file = req.file;
    if (!file) {
        return res.status(400).send('No file uploaded.');
    }

    const filename = file.originalname;
    
    const imgsrc = '../../../assets/NodeJs/uploadfile/';
    const  orgfile=imgsrc+filename;
    const sender=req.params.sender;
  
    
    const values=[orgfile,sender];
  
      const sql='INSERT INTO `status` (`file`, `sender`) VALUES (?, ?)';
      db.query(sql,values,(err,result)=>{
       if (err) {
           console.error('Error retrieving data:', err);
           return res.status(500).json({ error: 'Internal Server Error' });
       }
       res.status(200).json(result);
       console.log('inserted status');
      })
  
}
const GetStatus=(req,res)=>{
    const sender=req.params.sender;
      const sql='select file from status where status.sender=? order by id desc limit 1';
      db.query(sql,[sender],(err,result)=>{
       if (err) {
           console.error('Error retrieving data:', err);
           return res.status(500).json({ error: 'Internal Server Error' });
       }
       res.status(200).json(result);
      })
  
}

const GetallStatus=(req,res)=>{
    
      const sql='select * from status';
      db.query(sql,(err,result)=>{
       if (err) {
           console.error('Error retrieving data:', err);
           return res.status(500).json({ error: 'Internal Server Error' });
       }
       res.status(200).json(result);
      })
  
}

const DeleteStatus = (req, res) => {
    const sender = req.params.sender;
    console.log(`Received request to delete status for sender: ${sender}`); // Debugging log

    const sql = 'DELETE FROM status WHERE sender = ?';
  
    db.query(sql, [sender], (err, result) => {
        if (err) {
            console.error('Error deleting data:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        console.log(`Successfully deleted status for sender: ${sender}`, result); // Debugging log
        res.status(200).json({ message: `Deleted status for sender: ${sender}`, result });
    });
};


module.exports = {  uploadFile,  GetChat, InsertChat, GetRecentMessage, UploadStatus, GetStatus, DeleteStatus,GetallStatus };

  