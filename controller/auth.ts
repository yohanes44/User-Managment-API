import express from "express";
import ejs from "ejs";
import fs from "fs";
import bcrypt from "bcrypt";
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';

const fakeDBUser: any = JSON.parse(fs.readFileSync("./Infrastructure/Database/FakeDB/user.json", { encoding: 'utf8' }))


// const authInteractor = null;


const SECRET_ID = "userMgmtKey4466";


export async function register (req:any, res:any) {

    try{
        var { appId, fullName, password, email } = req.body;
 
        const checkExistingUser = await fakeDBUser.find( (user: any) => user.email == email);
    
        var userID = fakeDBUser.length;
    
       if(checkExistingUser){
           return res.json("User with Email Address exists, try another one");
       }
       

       // const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(password, 10);
    
       fakeDBUser.push({ userId: userID++, fullName: fullName, password: hashedPassword, email } );
    
    
       fs.writeFileSync("./Infrastructure/Database/FakeDB/user.json", JSON.stringify(fakeDBUser), { encoding: 'utf8' })
    
       return res.status(200).json({newUser: checkExistingUser, message:"User Registered successfully"})
    
    }
    catch(error: any){
        return res.json({message: error.message});
    }
   
  
}


export async function login (req: any, res: any) {

    try{
        const { email, password } = req.body;
        const userFound = fakeDBUser.find((user: any) => user.email == email);
 
        if(!userFound) {
            return res.json("No User Registered with the specified Email")
        }
 
        const passwordCheck = await bcrypt.compare(password, userFound.password);
        
 
        if(!passwordCheck){
            return res.json("Password does not match");
        }
 
        const payload = { fullName: userFound.fullName, email: userFound.email}
        const token = jwt.sign(payload, SECRET_ID);
 
        res.cookie("token", token);
        return res.json({ message:"Loged In succesfully", token });
    }
 


    catch(err){
        return res.json(err);
    }
 
 
 }


