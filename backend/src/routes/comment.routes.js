import Router from "express"
import verifyJWT from "../middlewares/auth.middleware";
import {addCommment, getallComments} from "../controllers/comment.controllers.js";


const router = Router();

router.route("/addComment").post(verifyJWT, addCommment)
router.route("/getAllComments/:postId").post(getallComments)


export default router;