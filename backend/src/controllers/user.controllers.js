import { User } from "../models/user.models.js"



const getAccessAndRefreshToken = async function (id) {
    // fetch the user
    try {
        const user =  await User.findOne(id);
        if(!user) {
            res.status(400).json({message: "ID not found"})
        }

        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false});
        return {accessToken, refreshToken}
    } catch (error) {
        res.status(500).json({message: "Something went wrong while generating referesh and access token"})
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
    // validate if all the fields are there or not
    if (!(email && password)) {
        res.status(400).json({ message: "All fields are required" })
    }

    // make sure the email exists.
    const existedUser = await User.findOne({ email });

    if (!existedUser) {
        res.status(400).json({ message: "Email does not exist" })
    }
    const isValidPassword = await existedUser.isPasswordCorrect(password);

    if(!isValidPassword) {
        res.status(400).json({ message: "Invalid Password" })
    }

     // generate tokens and store in the cookies
    const {accessToken, refreshToken} = await getAccessAndRefreshToken();

    const options = {
        httpOnly: true,
        secure: true
    }

    res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({data: existedUser, message: "USER LOGGED IN SUCCESSFULLY"})
}

export { registerUser, loginUser }