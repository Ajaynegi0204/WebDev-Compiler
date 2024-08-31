"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const dbConnect_1 = require("./lib/dbConnect");
const compilerRouter_1 = require("./routes/compilerRouter");
const userRouter_1 = require("./routes/userRouter");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// Set up session store with MongoDB
const sessionStore = connect_mongo_1.default.create({
    mongoUrl: process.env.MONGO_URI, // MongoDB connection string
    collectionName: 'sessions'
});
// Configure session middleware
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET || 'your-session-secret',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Set to true if using HTTPS
        sameSite: 'none' // Required for cross-site cookies
    }
}));
// CORS Configuration
app.use((req, res, next) => {
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
app.use('/compiler', compilerRouter_1.compilerRouter);
app.use('/user', userRouter_1.userRouter);
// Connect to the database
(0, dbConnect_1.dbConnect)().then(() => {
    console.log("Connected to the database");
}).catch((err) => {
    console.error("Database connection error:", err.message);
});
// Start the server
app.listen(4000, () => {
    console.log("Listening on port 4000");
});
