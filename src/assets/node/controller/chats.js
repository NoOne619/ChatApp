const chatModel = require("../Models/chats");
const GetChat = async (req, res) => {
    chatModel.find({
    }).then((result) => {
        res.json(result)
    }).catch((err) => {
        console.log()
    })
};


const InsertChat = async (req, res) => {
    const user = new chatModel({
        message: req.body.message,
        sender: req.body.sender,
        receiver: req.body.receiver
    });
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const uploadFile = async (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).send('No file uploaded.');
    }

    const filename = file.originalname;

    const imgsrc = '../../../assets/node/uploadfile/';

    val = new chatModel({
        message: imgsrc + filename,
        sender: req.params.sender,
        receiver: req.params.receiver,
        filebool:true
    })
    try{
        const newuser=await val.save();
        res.status(201).json(newuser)   
    }
    catch(error){
        res.status(400).json({ message: error.message });
    }
};
const GetRecentMessage = async (req, res) => {
    try {
        const latestChat = await chatModel.find({})
            .sort({ _id: -1 })
            .limit(1)
            .exec(); // Execute the query and return the result as a promise

        res.status(201).send(latestChat);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};




module.exports = { InsertChat, GetChat,uploadFile,GetRecentMessage };
