// Requirments 
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Defining schema 
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
    tokens : [{
        token : {
            type : String,
            required : true
        }
    }]
})

// Generating token

userSchema.methods.generateAuthToken = async function(){
    try {
        const token = jwt.sign({_id : this._id.toString()} , 'thisisthesecretekeyofnishantsisodiya');
        this.tokens = this.tokens.concat({token : token})
        await this.save();
        return token;
    } catch (error) {
        res.send(error);
        console.log(error);
    }
}

//Password Hashing

userSchema.pre("save" ,async function(next) {

    if(this.isModified("password")){        //For if the password can be modified in future
        this.password = await bcrypt.hash(this.password, 10);
        this.repeatPassword = await bcrypt.hash(this.password, 10);
    }
        next();
})


// exporting modules 

const Register = new mongoose.model("Register" , userSchema);

module.exports = Register;