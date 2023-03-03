import { Request, Response } from "express"
const notFound = (req:Request, res:Response) => res.status(404).send({success: false, message:'Route does not exist'})


export default notFound;
