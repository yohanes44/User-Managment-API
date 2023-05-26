
import express from "express";
import ejs from "ejs";
import fs from "fs";
import bcrypt from "bcrypt";
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';

const fakeDB: any = JSON.parse(fs.readFileSync("./Infrastructure/Database/FakeDB/user.json", { encoding: 'utf8' }))


// const authInteractor = null;


const SECRET_ID = "userMgmtKey4466";

export default async function registerUser({ fullName, email, password, appId}){
  

    const checkExistingUser = await fakeDB['user'].find( (user: any) => user.email ==email);

   if(checkExistingUser){
       return "User with Email Address exists, try another one";
   }
   
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password, salt);

   fakeDB.user.push({ fullName, password: hashedPassword, email } );


   fs.writeFileSync("./Infrastructure/Database/FakeDB/user.json", JSON.stringify(fakeDB), { encoding: 'utf8' })

   return {newUser: checkExistingUser, message:"User Registered successfully"};

}