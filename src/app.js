const { urlencoded } = require('express');
const express = require('express');
const app = express();
const hbs = require('hbs')
const path = require('path')
require('./db/connection')
const Register = require('./model/userRegister')

const port = process.env.port || 1212

const static_path = path.join(__dirname, '../public')
const templates_path = path.join(__dirname, '../templates/views')
const partials_path = path.join(__dirname, '../templates/partials')

app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", templates_path);
hbs.registerPartials(partials_path);


app.get('/', (req, res) => {
    res.render("login")
})

app.get('/register', (req, res) => {
    res.render("register")
})

app.get('/index', (req, res) => {
    res.render("index")
})

// to create a new user in database
app.post('/register', async (req, res) => {
    try {
        const password = req.body.password;                           //Getting input values
        const Cpassword = req.body.repeatPassword;

        if (password === Cpassword) {

            const RegisterUser = new Register({
                firstName: req.body.firstName,
                LastName: req.body.LastName,
                email :req.body.email,
                phone: req.body.phone,
                password :password,
                repeatPassword : Cpassword
            })

            const registered = await RegisterUser.save()
            res.status(201).render("index")

        } else {
            res.send("Password is not matching")
        }
    } catch (error) {
        res.status(400).send(error)
    }
})



// login check

app.post('/login' , async(req , res)=>{
    try {
        const email = req.body.email;
        const password = req.body.password;
        
        const userEmail = await Register.findOne({email:email});
        
        if(userEmail.password === password){
            res.status(201).render('index')
        }
        else{
            res.send("invalid password")
        }

    } catch (error) {
        res.status(400).send("Invalid Login Details")
    }
})

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
})