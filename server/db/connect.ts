import {connect} from "mongoose";

const connectDB = async (): Promise<void> => {

    try {
        await connect(`${process.env.MONGO_URI}`);

        console.log("Connected to MongoDB 🚀")
    } catch (error) {
        console.log("Connection error");
    }

};

export default connectDB;
