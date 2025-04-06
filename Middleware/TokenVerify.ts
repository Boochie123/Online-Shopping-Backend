import express, { NextFunction } from "express";
import jwt from "jsonwebtoken";

const verifyToken=async(request:express.Request,response:express.Response,next:express.NextFunction):Promise<void>=>
{
    let token=request.header('x-auth-token');

    if(!token)
    {
        response.status(401).json({msg:'Token not provided,access denied'})
        return;
    }
    try
    {
        jwt.verify(token,'sshhhh',async (error:any,payload:any)=>
        {
            if(error)
            {
              response.status(401).send({msg:'Token is invalid'});
              return;
            }
            
                response.locals.jwt=await payload?.user.id;
                next();
            
        });
        
    }
    catch(error)
    {
        response.status(401).send({msg:'Token is invalid'});
    }
}

export default verifyToken;