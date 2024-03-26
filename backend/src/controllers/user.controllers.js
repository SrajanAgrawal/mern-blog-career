import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.models.js";
import mongoose from "mongoose";


export const registerUser = async (req, res) => {
    // main logic here.

    const { username, email, password } = req.body;

    // if any of the fields is missing then return the error
    if (!(username && email && password)) {
        // throw new ApiError(400, "All fields are reuired");
        res.status(400).json({"message": "All fields are required"})
    }

    // const newUser = new User({
    //     username: username.toLowerCase(),
    //     email,
    //     password
    // })


    // try {
    //     await newUser.save(), 
    //     res.status(201).json({
    //         "message": "user created successfully"
    //     })
    // } catch (error) {
    //     throw new ApiError(500, "user not created now")
    // }

    try {
        const createdUser = await User.create({
            username: username.toLowerCase(),
            email,
            password
        }).select("-password")

        console.log(createdUser)
        res.status(201).json({"message": "User Created Successfully", "data": createdUser})
    } catch (error) {
        console.log(`error occured ${error}`);
        res.status(400).json({"error": error})
    }
    
}


