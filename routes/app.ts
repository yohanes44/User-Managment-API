import express from "express";
import ejs from "ejs";
import fs from "fs";
import bcrypt from "bcrypt";
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';

// import expressJwt from "express-jwt";


 import {  appRegister } from "../controller/app";

 import Authentication from "../Infrastructure/Authentication/Authentication";

const router = express.Router();


const fakeDB: any = JSON.parse(fs.readFileSync("./Infrastructure/Database/FakeDB/user.json", { encoding: 'utf8' }))






// console.log(fakeDB["user"][2].email);

// router.use( jwt({
// ) );

router.post("/appRegister", Authentication,  appRegister);


// router.post("/login", loginUser);    


// router.get("/userRegister", (req: any, res: any) {
//     res.render("userRegistration");
// });


export default router

