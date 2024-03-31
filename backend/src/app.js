// express server code
import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express();

// add all the middlewares

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser())


// import all the routers here.
import userRouter from "./routes/user.routes.js"

// routes middlewares information
app.use("/api/user", userRouter);




export  {app};
