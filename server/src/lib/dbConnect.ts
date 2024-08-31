import mongoose from "mongoose";
export const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!, {
            dbName: "wd-compiler",
        });
        console.log("MongoDB connected");
    } catch (error) {
        console.log(error);
    }

}