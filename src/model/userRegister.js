const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    firstName : {
        type : String,
        required : true
    },
    LastName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    phone : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        unique : true,
        type : String,
        required : true
    },
    repeatPassword : {
        unique : true,
        type : String,
        required : true
    },
})


const Register = new mongoose.model("Register" , userSchema);

module.exports = Register;