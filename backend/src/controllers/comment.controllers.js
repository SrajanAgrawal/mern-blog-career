import { Comment } from "../models/comment.models";


export const addCommment = async (req, res) => {
    try {
        const user = req.user;
        if (!user) return res.status(401).json({ message: "Unauthorized" })

        const { content, postId } = req.body;
        const userId = user._id;
        if (!content || !postId) return res.status(400).json({ message: "Content and postId are required" })

        const newComment = new Comment({
            content,
            postId,
            userId
        })

        const savedComment = await newComment.save();
        if (!savedComment) return res.status(500).json({ message: "Could not save the comment in db" })

        return res.status(201).json({ data: savedComment, message: "Comment added successfully" })
    } catch (error) {
        console.log(`error is coming from add comment controller ${error}`)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}


export const getallComments = async (req, res) => {
    try {

        const { postId } = req.params.postId;
        if (!postId) return res.status(400).json({ message: "postId is required" })

        const allComments = await Comment.find({ postId })

        if (!allComments) return res.status(200).json({ data: [], message: "No comments found" })

        return res.status(200).json({ data: allComments, message: "All comments fetched successfully" })

    } catch (error) {
        console.log(`error is coming from get all comments controller ${error}`)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}


