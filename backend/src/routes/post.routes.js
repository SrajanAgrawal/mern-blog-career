import Router from "express"
import { uploadBlogPost } from "../controllers/post.controllers.js";
import verifyJWT from "../middlewares/auth.middleware.js";
import {upload} from "../middlewares/multer.middleware.js";

// const router = require("express").Router();

const router = Router();


router.route("/upload").post(verifyJWT, upload.single("thumbnail") ,uploadBlogPost)

export default router;