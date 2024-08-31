import express, { Request, Response, NextFunction } from "express";
import { config } from "dotenv";
import { dbConnect } from "./lib/dbConnect";
import { compilerRouter } from "./routes/compilerRouter";
import { userRouter } from "./routes/userRouter";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";

// Load environment variables
config();

// Create Express app
const app = express();
app.use(express.json());
app.use(cookieParser());

// Set up session store with MongoDB
const sessionStore = MongoStore.create({
  mongoUrl: process.env.MONGO_URI as string, // Your MongoDB connection string
  collectionName: 'sessions'
});

// Configure session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-session-secret',
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    httpOnly: true,
    secure: true, // Set to true if using HTTPS
    sameSite: 'none'// Ensure cookies are sent in cross-site requests
  }
}));

// CORS Configuration
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "https://aocompiler.onrender.com"); // Your client origin
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // Handle pre-flight OPTIONS request
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  next();
});

// Use routers
app.use('/compiler', compilerRouter);
app.use('/user', userRouter);

// Connect to the database
dbConnect().then(() => {
  console.log("Connected to the database");
}).catch((err: Error) => {
  console.error("Database connection error:", err.message);
});

// Start the server
app.listen(4000, () => {
  console.log("Listening on port 4000");
});
