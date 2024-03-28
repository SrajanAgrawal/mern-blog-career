// express server code
import express from "express"
import cookieParser from "cookie-parser"

const app = express();

// add all the middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser())

// import all the routers here.
import userRouter from "./routes/user.routes.js"

// routes middlewares information
app.use("/api/user", userRouter);




export  {app};
