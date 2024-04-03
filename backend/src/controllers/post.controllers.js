import {Post} from "../models/post.models.js"
import { uploadFileOnCloudinary } from "../utils/cloudinary.js";

export const uploadBlogPost =  async (req,res) => {
    
    // if there is no user in the request then do not allow the user to upload the post
    if(!req.user) {
        return res.status(401).json({message: "You are not authorized"})
    }
    // take care of all the required fields 
      if (!req.body.title || !req.body.content) {
        return res.status(400).json({ message: 'Please provide all required fields' });
      }

      var response = ""
      if(req.file) {
          const filePath = req.file.originalname;
           response = await uploadFileOnCloudinary(`\public\\temp\\${filePath}`)
          console.log(response)
    
          if(!response.url) {
                return res.status(500).json({message: "Could not upload the image"})
          }
          response = response.url
        }

      // the unique slug for the post -> title -> slug
      const slug = req.body.title
        .split(' ')
        .join('-')
        .toLowerCase()
        .replace(/[^a-zA-Z0-9-]/g, '');

      const newPost = new Post({
        ...req.body,
        image: response,
        slug,
        userId: req.user.id,
      });
      try {
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
      } catch (error) {
        console.log(`error is coming from upload blog post controller ${error}`)
        res.status(500).json({ message: 'Internal Server Error' });
      }
}

export const getallPosts = async (req,res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({data: posts, message: "All posts fetched successfully"});
  } catch (error) {
    console.log(`error is coming from get all post controller ${error}`)
    res.status(500).json({message: "Internal Server Error"})
  }
}


export const searchPostByQuery = async (req,res) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;

    // all the post based on user search query by userId or category or slug or postId  
    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: 'i' } },
          { content: { $regex: req.query.searchTerm, $options: 'i' } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await Post.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}


