const userModal = require("../Models/users");

const GetUserData = async (req, res) => {
    userModal.find({ $and: [
        { name: 'abdullah' },
        { email: '@' }
    ]}).then((result)=>{
        res.json(result)
    }).catch((err)=>{
        console.log()
    })
};
const UpdateUserData = async (req, res) => {
    
    try {
        const result = await userModal.updateOne(
            { name: req.params.name },
            { $set: { email: 'asghar' } }
        );
        if (result.nModified > 0) {
            res.status(200).json({ message: "User updated successfully" });
        } else {
            res.status(404).json({ message: "User not found or no changes made" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const PostUserData = async (req, res) => {
    const user = new userModal({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const DeleteUserData = async (req, res) => {
    
    try {
        const newUser = await userModal.deleteOne({name:req.params.name});
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const SearchUsers = async (req,res) => {
    try {
        const regexPattern = new RegExp(req.params.searchTerm, 'i');
        const users = await userModal.find({ name: { $regex: regexPattern } });
        res.status(201).json(users);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
};



module.exports = {SearchUsers,DeleteUserData,UpdateUserData,PostUserData, GetUserData};
  