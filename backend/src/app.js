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
import postRouter from "./routes/post.routes.js"

// routes middlewares information - version 1
app.use("/api/v1/user", userRouter);
app.use("/api/v1/post", postRouter)

app.get("/", (req,res) => {
    res.send("Welcome to the backend server")
})


export  {app};
