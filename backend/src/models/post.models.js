import mongoose from "mongoose"

const category = [
    'Tech',
    'Music',
    'Movies',
    'Sports',
    'Fashion',
    'Food',
    'Travel',
    'Science',
    'Politics',
    'Health',
    'Lifestyle',
    'Business',
    'Finance',
    'Education',
    'Others',
  ];

const postSchema = new mongoose.Schema({
    
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
        title: {
          type: String,
          required: true,
          unique: true,
        },
        image: {
          type: String,
          default:
            'https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png',
        },
        category: [{
          type: String,
          enum: category,
          default: 'Others',
        }],
        // http://localhost:5173/post/learn-react-in-two-hours8982192jfdkfjd
        slug: {
          type: String,
          required: true,
          unique: true,
        },
}, {timestamps: true})


export const Post = mongoose.model('Post', postSchema)