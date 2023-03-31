const mongoose = require('mongoose');


mongoose.connect("mongodb://localhost:27017/userRegistration")
.then(()=>{
    console.log("Connection successfull");
}).catch((err)=>{
    console.log(err);
    console.log("Unable to connect to database");
});