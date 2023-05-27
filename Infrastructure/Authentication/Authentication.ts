

import express from "express";
import ejs from "ejs";
import fs from "fs";
import bcrypt from "bcrypt";
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';

const fakeDBUser: any = JSON.parse(fs.readFileSync("./Infrastructure/Database/FakeDB/User.json", { encoding: 'utf8' }))
const fakeDBApp: any = JSON.parse(fs.readFileSync("./Infrastructure/Database/FakeDB/Application.json", { encoding: 'utf8' }))




const SECRET_ID = "userMgmtKey4466";





// export default class Authentication {

//     public token: any;

//     constructor(token: any){
//         this.token = token;
//     }

//     authenticate(req: any, res: any, next: any){
       

//             try{
//                 // const decoded = jwt.verify(token, )
//                 // const appTarget = fakeDBApp.find( (app: any) => app.ApplicationName == app);
                
        
//                 const decoded = jwt.verify(this.token, SECRET_ID);
                
//                 const fullName = (decoded as { fullName: any }).fullName;
        
//                 console.log(fullName);
            
//                 next();
//             }
//             catch(error: any){
//                 return error.message;
//             }
        
//     }
    
// }

export default async function Authentication(req: any, res: any, next: any){

    const token = req.headers.authorization.split("Bearer ")[1];

      try{
            const decoded = jwt.verify(token, SECRET_ID);
            //  console.log({decoded});
            //   if(!decoded){
            // console.log("UnAuthorized");
            // return res.status(404).json("UnAuthorized");
            const fullName = (decoded as { fullName: any }).fullName;
            const email = (decoded as { email: any }).email;
            req.user = { fullName, email };
            // console.log(req.user.email);
            
            return next();
        }
        catch(error: any){
            // console.log(error.message);
            return res.status(401).json("Unauthorized");
        }

}