import { NextFunction, Request, Response } from "express";
import { verifyJwt } from "../utils/jwt";

export const desearilizeUser = async (req: Request, res: Response, next: NextFunction) => {    

    const bearerToken = req.headers.authorization || "";
    const accessToken = bearerToken.replace(/^Bearer\s/, "");

    if(!accessToken){
        return next();
    };

    const decoded = verifyJwt(accessToken, "accessTokenPrivateKey");

    if(decoded){
        res.locals.user = decoded;  
    };

    return next();
};