import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        requried: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    // this is a new field - 30/03/24
    avatar : {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
    }
}, { timestamps: true })


// hash the password and store it in the db - add middleware to hash it
// jaise hi save hone wala hai usse pahle hash krdo
userSchema.pre("save", async function (next) {
    // if there are no changes in password field (then don nothing)
    if (!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10);
    return next()
})

// compare the password with the existing one
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(this.password, password);
}

// generate access token function
userSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        _id: this._id,
        username: this.username,
        email: this.email
    },
        process.env.ACCESS_TOKEN_SECRET,

        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

// generate access token function
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({
        _id: this._id,
    },
        process.env.REFRESH_TOKEN_SECRET,

        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema);

// Srajan , srajan, sRajan, srAjan -> srajan