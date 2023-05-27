import express from "express";
import ejs from "ejs";
import fs from "fs";
import bcrypt from "bcrypt";
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';

const fakeDBUser: any = JSON.parse(fs.readFileSync("./Infrastructure/Database/FakeDB/User.json", { encoding: 'utf8' }))
const fakeDBApp: any = JSON.parse(fs.readFileSync("./Infrastructure/Database/FakeDB/Application.json", { encoding: 'utf8' }))

import Authentication from "../Infrastructure/Authentication/Authentication";



const SECRET_ID = "userMgmtKey4466";



async function authenticateToken(token: any){

    try{
        // const decoded = jwt.verify(token, )
        // const appTarget = fakeDBApp.find( (app: any) => app.ApplicationName == app);
        
        const decoded = jwt.verify(token, SECRET_ID);
        
        const fullName = (decoded as { fullName: any }).fullName;

        console.log(fullName);
    
        // console.log(decoded.fullName);

        return;

    }
    catch(error: any){
        return error.message;
    }

}





export async function appRegister(req: any, res: any){

    try{


        // console.log(req.user);
        const user = fakeDBUser.find( (user: any) => user.email == req.user.email );
        if(!user){
            return res.json("No user is found with your Email");
        }

        const { key, ApplicationName, Address } = req.body;
        const appAdmin = user.id;

        var appLength = fakeDBApp.length;
    
        fakeDBApp.push({ appId: appLength++, key, ApplicationName, Address, appAdmin });
    
    
        fs.writeFileSync('./Infrastructure/Database/FakeDB/Application.json', JSON.stringify(fakeDBApp, null, 2) + '\n');
        
        return res.json({message: "Application Registered Succesffuly", "app info": fakeDBApp[fakeDBApp.length - 1] });
    
    }
    catch(error: any){
        return res.json({message: error.message});
    }
    
   
}


export async function userRegister(req: any, res:any){
    


    // fakeDBUser.push({ fullName, password, email });
}