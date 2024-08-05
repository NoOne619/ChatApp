const express = require("express");
const { GetUserData, PostUserData, UpdateUserData, DeleteUserData } = require("../controller/user");

const route = express.Router();
route.get('/get',GetUserData);
route.post('/post',PostUserData);
route.put('/put/:name',UpdateUserData)
route.delete('/delete/:name',DeleteUserData);

module.exports = route;
