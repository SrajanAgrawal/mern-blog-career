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
        next(error);
      }
}