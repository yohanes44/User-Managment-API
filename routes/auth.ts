import express from "express";
import ejs from "ejs";
import fs from "fs";
import bcrypt from "bcrypt";
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';


import {  register, login } from "../controller/auth";

const router = express.Router();


const fakeDB: any = JSON.parse(fs.readFileSync("./Infrastructure/Database/FakeDB/user.json", { encoding: 'utf8' }))


// console.log(fakeDB["user"][2].email);



router.post("/userRegister", register)


router.post("/login", login);    


router.get("/userRegister", async function (req: any, res: any){
    res.render("userRegistration");
});


export default router

