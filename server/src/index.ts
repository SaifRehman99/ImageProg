/**
 * Required External Modules
 */

import * as dotenv from "dotenv";
import connectDB from "../db/connect";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import { v2 as cloudinary } from "cloudinary";

/**
 * Required Routes
 */

import ImageRoute from "../routes/Image.route";
import notFound from "../middleware/notFound";
import errorHandlerMiddleware from "../middleware/error-handler";


/**
 * Configuration of env 
 **/
dotenv.config();



/**
 * Database Connecion
 */
connectDB();

/**
 * App Variables
 */

if (!process.env.PORT) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app: Express = express();

/**
 *  App Configuration && middleware
 */

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});


app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get("/", (req: Request, res: Response) => {
    res.send("🚀 Ummm... Welcome to Image Prog Club!");
});

app.use("/api/v1/image", ImageRoute);

app.use(notFound);
app.use(errorHandlerMiddleware);

/**
 * Server Activation
 */

app.listen(PORT, () => {
    console.log(`[Server] : Running on ${PORT} 🚀`);
});


export default app;