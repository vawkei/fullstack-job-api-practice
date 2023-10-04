const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:[true,"Please provide a name"],
        maxlength:[9,"Name shouldn't be > 9"]
    },
    email:{
        type:String,
        trim:true,
        required:[true,"Please provide an email"],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"Please Provide a valid email"],
        unique:true
    },
    password:{
        type:String,
        trim:true,
        required:[true,"Please provide a name"],
        minlength:[6, "password shouldn't be less than 6 characters"]
    },
});

module.exports = mongoose.model("user",UserSchema)