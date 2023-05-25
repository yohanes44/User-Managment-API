


import express from "express";
import ejs from "ejs";
import fs from "fs";
import bcrypt from "bcrypt";
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';

// const jwt = jsonwebtoken;

const fakeDB: any = JSON.parse(fs.readFileSync("./Infrastructure/Database/FakeDB/user.json", { encoding: 'utf8' }))



// console.log(fakeDB.user);


const app = express();


const port = 3000;
const SECRET_ID = "userMgmtKey4466";




app.use(express.static("public"))
app.use(express.json());

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.json("User Managment API");
})

app.get("/userRegister", (req, res) => {
    res.render("userRegistration");
});



app.get("/appRegister", (req, res) => {
    res.render("appRegistration");
});


app.post("/userRegister", async (req, res) => {
   
     var { appId, fullName, password, email } = req.body;
  
     const checkExistingUser = fakeDB.user.find( (user: any) => user.email ==email);

    if(checkExistingUser){
        res.json("User with Email Address exists, try another one");
    }
    
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    fakeDB.user.push({ fullName, password, email } );


    fs.writeFileSync("./Infrastructure/Database/FakeDB/user.json", JSON.stringify(fakeDB), { encoding: 'utf8' })

    res.status(200).json("User REgistered successfully")

})


app.post("/login", async (req, res) => {

    try{
        const { email, password } = req.body;
        const userFound = fakeDB.user.find((usr: any) => usr.email == email);

        if(!userFound) {
            return res.json("User NOt Registered")
        }

        const passwordCheck = await bcrypt.compare(userFound.password, password);

        console.log(passwordCheck);
        if(!passwordCheck){
            return res.json("Password does not match");
        }

        const payload = { userName: userFound.username, email: userFound.email}
        const token = jwt.sign(payload, SECRET_ID);
        return res.json({ message:"Loged In succesfully", token });
    }

    catch(err){
        return res.json(err);
    }
 

});    




app.listen(port, ()=>{
    console.log(`Authentication API server listening on ${port}`);
});

