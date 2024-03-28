import { User } from "../models/user.models.js"
import { ApiError } from "../utils/ApiError.js"
import bcrypt from "bcrypt"


const getAccessAndRefreshToken = async function (id) {
    // fetch the user
    try {
        const user = await User.findById(id);
        console.log(user);
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        console.log(accessToken + "" + refreshToken)

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        console.log("hi")
        return { accessToken, refreshToken }
    } catch (error) {
        // res.status(500).json({message: "Something went wrong while generating referesh and access token"})
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
        console.log(error);
    }

}

const registerUser = async (req, res) => {

    const { username, email, password } = req.body;

    // validations
    if (!(username && email && password)) {
        res.status(400).json({ message: "All fields are required" })
    }

    // if the user is existed or not
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        res.status(400).json({ message: "User already exists" })
        return;
    }


    // to create the user with the given username and password
    await User.create({
        username: username.toLowerCase(),
        email,
        password
    }).then((result) => {
        const user = result
        res.status(201).json({ data: user, message: "User created Successfully" })
    }).catch((err) => {
        console.log(`error ${err}`)
        res.status(500).json({ data: err })
    })
}

const loginUser = async (req, res) => {
    // fetch the req body and take out the email, password
    const { email, password } = req.body;
    console.log(password);
    // validate if all the fields are there or not
    if (!(email && password)) {
        return res.status(400).json({ message: "All fields are required" })
    }

    // make sure the email exists.
    const existedUser = await User.findOne({ email });


    if (!existedUser) {
        res.status(400).json({ message: "Email does not exist" })
    }
    console.log(existedUser.password);
    const storedPassword = existedUser.password
    const isValidPassword = await bcrypt.compare(password, storedPassword);

    // const isValidPassword = await existedUser.isPasswordCorrect(password);

    if (!isValidPassword) {
        res.status(400).json({ message: "Invalid Password" })
    }

    // generate tokens and store in the cookies
    const { accessToken, refreshToken } = await getAccessAndRefreshToken(existedUser._id);

    // cookies can only be changed or updated by server 
    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json({ data: existedUser, message: "USER LOGGED IN SUCCESSFULLY" })
}


const logoutUser = async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json({message: "Logout successfully" })

}

const getCurrentUser = async (req,res) => {
    return res.status(200).json({message: "User fetched successfully", data: req.user})
}

export { registerUser, loginUser, logoutUser, getCurrentUser }