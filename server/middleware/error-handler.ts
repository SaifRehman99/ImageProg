import { Request, Response, NextFunction } from "express";

  
/**
 * This is a Custom Error Handler, we are using "async-handler-express" which pass the exception to the middleware
 * Here, we can modify the error by maintaining the concern 
 **/

const errorHandlerMiddleware = (err:any, req:Request, res:Response, next:NextFunction) => {
    
    const customError = {
      statusCode: res.statusCode == 200 ? 500 : res.statusCode,
      msg: err.message || 'Something went wrong try again later',
    }
  
 
    return res.status(customError.statusCode).json({ status:"fail", message: customError.msg })
  }
  

export default errorHandlerMiddleware;