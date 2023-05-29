import express from "express";
import ejs from "ejs";
import fs from "fs";
import bcrypt from "bcrypt";
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';

const fakeDBUser: any = JSON.parse(fs.readFileSync("./Infrastructure/Database/FakeDB/User.json", { encoding: 'utf8' }))
const fakeDBApp: any = JSON.parse(fs.readFileSync("./Infrastructure/Database/FakeDB/Application.json", { encoding: 'utf8' }))
const fakeDBRole: any = JSON.parse(fs.readFileSync("./Infrastructure/Database/FakeDB/Role.json", { encoding: 'utf8' }))
const fakeDBPermission: any = JSON.parse(fs.readFileSync("./Infrastructure/Database/FakeDB/Permission.json", { encoding: 'utf8' }))




import Authentication from "../Infrastructure/Authentication/Authentication";



const SECRET_ID = "userMgmtKey4466";



// async function authenticateToken(token: any){

//     try{
//         // const decoded = jwt.verify(token, )
//         // const appTarget = fakeDBApp.find( (app: any) => app.ApplicationName == app);
        
//         const decoded = jwt.verify(token, SECRET_ID);
        
//         const fullName = (decoded as { fullName: any }).fullName;

//         console.log(fullName);
    
//         // console.log(decoded.fullName);

//         return;

//     }
//     catch(error: any){
//         return error.message;
//     }

// }





export async function appRegister(req: any, res: any){

    try{


        // console.log(req.user);
        const user = fakeDBUser.find( (user: any) => user.email == req.user.email );
        if(!user){
            return res.json("No user is found with your Email");
        }

        const { key, ApplicationName, Address, Roles } = req.body;
        const appAdmin = user.id;

        var appLength = fakeDBApp.length;

        fakeDBApp.push({ appId: appLength++, key, ApplicationName, Address, appAdmin });
        fs.writeFileSync('./Infrastructure/Database/FakeDB/Application.json', JSON.stringify(fakeDBApp, null, 2) + '\n');
       
        

        var roleLength = fakeDBRole.length--;

        Roles.map( (role: any) => {
       
            fakeDBRole.push({
                    "id": roleLength++,
                    "appId": fakeDBApp[fakeDBApp.length - 1].appId,
                    "Name": role
                })

            // console.log(role)
        } )

        fs.writeFileSync('./Infrastructure/Database/FakeDB/Role.json', JSON.stringify(fakeDBRole, null, 2) + '\n');
       
       
        return res.json({message: "Application Registered Succesffuly", "app info": fakeDBApp[fakeDBApp.length - 1], Roles: Roles });
    
    }
    catch(error: any){
        return res.json({message: error.message});
    }
    
   
}





// export async function userRegister(req: any, res:any){
    
//     const user = fakeDBUser.find( (user: any) => user.email == req.user.email );
//     if(!user){
//         return res.json("No user is found with your Email");
//     }

//     const { fullName, password, email } = req.body;

//     const checkExistingUser = await fakeDBUser.find( (user: any) => user.email == email);
    
//         var userID = fakeDBUser.length;
    
//        if(checkExistingUser){
//            return res.json("User with Email Address exists, try another one");
//        }
       

//        // const salt = await bcrypt.genSalt(10);
//        const hashedPassword = await bcrypt.hash(password, 10);
    
//        fakeDBUser.push({ userId: userID++, fullName: fullName, password: hashedPassword, email } );
    
    
//        fs.writeFileSync("./Infrastructure/Database/FakeDB/user.json", JSON.stringify(fakeDBUser), { encoding: 'utf8' })
    
//        return res.status(200).json({newUser: checkExistingUser, message:"User Registered successfully"})

//     // fakeDBUser.push({ fullName, password, email });
// }

export async function addPermission (req: any, res: any){

    try{


        // console.log(req.user);
        const currentUser = fakeDBUser.find( (user: any) => user.email == req.user.email );
        if(!currentUser){
            return res.json("No user is found with your Email");
        }
           
        const {userId, roleId, appId} = req.body;

        const app = fakeDBApp.find( (app: any) => app.appId == appId );

        if(!app){
            return res.json("No app is found with this APP ID")
        }
        
        // const currentUser = fakeDBUser.find( (user: any) => user.email == req.user.email );

        if(!app.owner == currentUser.id){
            return res.json("You can't add permission to Application you are not Owener of");
        }


        const userToBeAdded = fakeDBUser.find( (user: any) => user.id == userId );
        
        const roleTobeAdded = fakeDBRole.find( (role:any) => role.id == roleId );


        if(!userToBeAdded){
            return res.json("There is no User with this Id");
        }

        if(!roleTobeAdded){
            return res.json("There is no Role with this Id");
        }


        var permissionLength = fakeDBPermission.length;

        fakeDBPermission.push( { id: permissionLength++, userId, roleId} );

        return res.json({message: "Permission Added succesfully", permissionInfo: fakeDBPermission[permissionLength++] });

    }
    catch(error: any){
        console.log(error.message);
        return res.json(error.message);
    }

}