import mongoose from "mongoose";

const connectDB = async () => {

    mongoose.connection.on('connected',() => {
        console.log("DB Connected");
    })

    mongoose.connection.on('error',(err) => {
        console.log("DB connection error: ", err);
    })

    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`)
    } catch (error) {
        console.log("MongoDB Connection Error:", error.message);
        process.exit(1);
    }

}

export default connectDB;