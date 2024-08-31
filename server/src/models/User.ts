import mongoose from "mongoose";

interface IUserSchema {
    username: string;
    email: string;
    password: string;
    picture: string;
    savedCodes: Array<mongoose.Types.ObjectId>;
}


const UserSchema = new mongoose.Schema<IUserSchema>(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    picture: {
      type: String,
      default: "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
    },
    savedCodes:[
       { type: mongoose.Schema.Types.ObjectId,
        ref: "Code",} ]
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
