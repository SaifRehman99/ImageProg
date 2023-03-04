import {connect} from "mongoose";


  
/**
 * This is function responsible for creating a connection with Database 
 **/



const connectDB = async (): Promise<void> => {

    try {
        await connect(`${process.env.MONGO_URI}`);

        console.log("Connected to MongoDB 🚀")
    } catch (error) {
        console.log("Connection error");
    }

};

export default connectDB;
