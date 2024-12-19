import { Request, Response } from "express";
import AuthServices from "../services/authServices";


export const signup = async (req: Request, res: Response) => {
    try{
        const user = await AuthServices.signUp(req.body);
        res.status(201).json(user);
    }catch(e: any){
        res.status(400).json({error: e.message});
    }
};

export const login = async (req: Request, res: Response) => {
    try{
        const { email, password} = req.body;
        const {token, user} = await AuthServices.login(email, password);
        res.status(200).json({token, user});
    }catch(e:any){
        res.status(400).json({error: e.message});
    }
}