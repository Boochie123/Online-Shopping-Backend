import express from "express";
import { IAddress, IUser } from "../Models/IUser";
import { UserTable } from "../Models/User";
import bcryptjs from 'bcryptjs';
import gravatar from 'gravatar';
import jwt from "jsonwebtoken";
import verifyToken from "../Middleware/TokenVerify";
const { check, validationResult } = require('express-validator');
const userRouter:express.Router=express.Router();  

//Register a user
/*
REST API CONFIGURATION
URL:http://127.0.0.1:5000/api/users/register
METHOD:POST
FIELDS:Name,email,password,password,confirm password
*/
userRouter.post('/register',[
    check('name').not().isEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Please provide a valid email'), // Add more validation if needed
    check('password').isLength({ min: 6 }).withMessage('Password should be at least 6 characters')
],async (request:express.Request,response:express.Response):Promise<void>=>
{
    let errors=validationResult(request);
    if(!errors.isEmpty())
    {
        response.status(400).json({errors:errors.array()});
        return;
    }
   try{
    let {name,email,password,isAdmin}=request.body;

    console.log(request.body);

    //Check if user exists

    let user:IUser | null= await UserTable.findOne({email:email});

    if(user)
    {
        
        response.status(401).json({msg:'User already exists'})
        return;
    }
    let salt=await bcryptjs.genSalt(10);
    let hashedPassword=await bcryptjs.hash(password,salt);
    //avatar url for email
    let avatar=gravatar.url(email,{
        s:'200',
        r:'pg',
        d:'mm'
    });

    //default address
    let address:IAddress={
        flat:'',
        street:'',
        landmark:'',
        city:'',
        mobile:'',
        state:'',
        pin:'',
        country:''

    }

    //create a user(register)

    let newUser=new UserTable({name,email,password:hashedPassword,avatar,address,isAdmin});

    newUser=await newUser.save();
    response.status(200).json({msg:'Registration success'})

   }
   catch(error)
   {
    console.log(error);
    response.status(500).json({errors:error})
   }
})

//login user
/*
REST API CONFIGURATION
URL:http://127.0.0.1:5000/api/users/login
METHOD:POST
FIELDS:email,password
*/
userRouter.post('/login',[
    check('email').not().isEmpty().withMessage('Email is required'),
    check('password').not().isEmpty().withMessage('Password is required')
], async (request:express.Request,response:express.Response):Promise<void>=>
{
    let errors=validationResult(request);
    if(!errors.isEmpty())
    {
        response.status(400).json({errors:errors.array()});
        return;
    }

    try
    {
        let {email,password}=request.body;
        let user= await UserTable.findOne({email:email});

    if(!user)
    {
        
        response.status(401).json({msg:'invalid email address'})
        return;
    }
    if (typeof user.password !== 'string') {
        response.status(401).json({ msg: 'Invalid password' });
        return;
    }
    let isMatch=await bcryptjs.compare(password,user.password)
    if(!isMatch)
    {
        response.status(401).json({ msg: 'Invalid password' });
        return;
    }
    //create a token
    let payload={
        user:
        {
            id:user.id,
            name:user.name,
            isAdmin:user.isAdmin
        }        
       }
       jwt.sign(payload, 'sshhhh', (err, token) => {
        if (err) throw err;
        response.status(200).json({
            msg:'login is success',
            token:token });
    });
    }
    catch(error)
    {
        console.log(error);
    }
})

//get login user info
/*
REST API CONFIGURATION
URL:http://127.0.0.1:5000/api/users
METHOD:Get
FIELDS:No-fields
*/

userRouter.get('/',verifyToken,async(request:express.Request,response:express.Response):Promise<void>=>
{
    try{
        const user=await UserTable.findById(response.locals.jwt);
        if (!user) {
            // If no user is found, return a 404 or appropriate error
            response.status(404).json({ msg: 'User not found' });
            return;
        }
        response.status(200).json(user);
        return;
    }
    catch(error)
    {
        response.status(401).json({msg:error})
        return;
    }
});

//create or update address
/*
REST API CONFIGURATION
URL:http://127.0.0.1:5000/api/users/address
METHOD:post
FIELDS:flat,street,landmark,city,country,pin,mobile,state
*/

userRouter.post('/address', verifyToken, async (request: express.Request, response: express.Response) => {
    try {
        let { flat, street, landmark, city, country, pin, mobile, state } = request.body;
        const user = await UserTable.findById(response.locals.jwt);

        if (!user) {
            response.status(404).json({ msg: 'User not found' });
            return;
        }

        let address:IAddress={
            flat:flat,
            street:street,
            landmark:landmark,
            city:city,
            mobile:mobile,
            state:state,
            pin:pin,
            country:country
        }

        console.log('Address to be updated:', address);

        // Update the user's address in the database
        user.address = address;
        await user.save();  // Ensure save is awaited

        response.status(200).json({ msg: 'Address updated successfully', address: user.address });
    } catch (error) {
        console.error(error);
        response.status(500).json({ msg: 'Error updating address', error: error });
    }
});

export default userRouter;