import Router from "express"
import { uploadBlogPost , getallPosts, searchPostByQuery} from "../controllers/post.controllers.js";
import verifyJWT from "../middlewares/auth.middleware.js";
import {upload} from "../middlewares/multer.middleware.js";

// const router = require("express").Router();

const router = Router();


router.route("/upload").post(verifyJWT, upload.single("thumbnail") ,uploadBlogPost)
router.route("/getAllPosts").post(getallPosts)
router.route("/searchPostByQuery").post(searchPostByQuery)

export default router;