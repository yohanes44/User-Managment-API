


import express from "express";
import ejs from "ejs";
import fs from "fs";
import bcrypt from "bcrypt";
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';

// const jwt = jsonwebtoken;
// console.log(fakeDB.user);


import authRouter from "./routes/auth"
import appRouter from "./routes/app"



const app = express();


const port = 3000;
const SECRET_ID = "userMgmtKey4466";




app.use(express.static("public"))
app.use(express.json());

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.json("User Managment API");
})


app.use("/auth/user", authRouter)
app.use("/auth/app", appRouter)


app.get("/appRegister", (req, res) => {
    res.render("appRegistration");
});



app.listen(port, ()=>{
    console.log(`Authentication API server listening on port ${port}`);
});

