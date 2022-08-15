const express = require('express');
const userModel = require("../models/user.js");
let bcrypt = require('bcrypt-nodejs');

const  middlewareAuth = async (username, password, cb) =>{
    const user = await userModel.findOne({"username": username});
    if(!user){
        return cb(null, false);
    }
    if(bcrypt.compareSync(password, user.password)){
        return cb(null, true);
    }else{
        return cb(null, false);
    }
}

const getUnauthorized  = (res) =>{
    return {data : 'Usuario no autorizado', msg : 'Usuario no autorizado'};
}

module.exports =  { middlewareAuth : middlewareAuth,
                    getUnauthorized :  getUnauthorized}