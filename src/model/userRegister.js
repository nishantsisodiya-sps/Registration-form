const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

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
        type : String,
        required : true
    },
    repeatPassword : {
        type : String,
        required : true
    },
})

userSchema.pre("save" ,async function(next) {

    if(this.isModified("password")){        //For if the password can be modified in future
        this.password = await bcrypt.hash(this.password, 10);

        this.repeatPassword = undefined;
    }
        next();
})

const Register = new mongoose.model("Register" , userSchema);

module.exports = Register;