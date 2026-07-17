import { NextFunction , Request, Response } from "express"
import config from "../config";
import Jwt, { JwtPayload } from "jsonwebtoken";

const auth = ()=>{
    return async(req: Request, res: Response, next: NextFunction)=>{
       try{
           const token = req.headers.authorization;
        if(!token){
            return res.status(500).json({message: "you are not allow !"});
        }
        const decoded = Jwt.verify(token, config.jwtSecret as string);
        console.log({ decoded });
        req.user = decoded as JwtPayload;
        next();
       }catch(err: any){
        res.status(500).json({
            success: false,
            message: err.message,
        });
       }
    };
};

export default auth;