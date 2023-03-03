import { Request, Response, NextFunction } from "express";


const errorHandlerMiddleware = (err:any, req:Request, res:Response, next:NextFunction) => {
    
    const customError = {
      statusCode: res.statusCode == 200 ? 500 : res.statusCode,
      msg: err.message || 'Something went wrong try again later',
    }
  
 
    return res.status(customError.statusCode).json({ status:"fail", message: customError.msg })
  }
  

export default errorHandlerMiddleware;