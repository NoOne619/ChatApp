const statusModel=require("../Models/status")

const UploadStatus = async(req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).send('No file uploaded.');
    }

    const filename = file.originalname;

    const imgsrc = '../../../assets/node/uploadfile/';
    const orgfile = imgsrc + filename;
    const sender = req.params.sender;

    stat=new statusModel({
        file:orgfile,
        sender:sender
    })
    try {
        const newStatus = await stat.save();
        res.status(201).json(newStatus);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
  
        
  
}
const GetStatus = async(req, res) => {
    try{
   const stat= await statusModel.find({
        sender:req.params.sender
    }).sort({
        _id:-1
    }).limit(1)
    .exec()
    res.status(201).send(stat);
}
catch(err){
    res.status(400).send({message:err.message});
}
    
}

const GetallStatus =async (req, res) => {

    try{
        const allstat= await statusModel.find();
        res.status(200).json(allstat);
    }
    catch(err){
        res.status(400).json(allstat);

    }
        
    

}

const DeleteStatus =async (req, res) => {
    try{
    const result = await statusModel.deleteMany({ sender: req.params.sender });
    res.status(200).json(result);

    console.log(result.deletedCount, 'documents deleted');
    }
    catch(err){
    res.status(400).json({message:err.message});
    }
};


module.exports={UploadStatus,GetStatus,GetallStatus,DeleteStatus};