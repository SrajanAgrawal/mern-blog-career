import mongoose from "mongoose"
import bcrypt from "bcrypt"

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
    }
}, { timestamps: true })


// hash the password and store it in the db - add middleware to hash it
// jaise hi save hone wala hai usse pahle hash krdo
userSchema.pre("save", async function (next) {
    // if there are no changes in password field (then don nothing)
    if(!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10);
    return next()
})

// compare the password with the existing one
userSchema.methods.isPasswordCorrect = function(password) {
    return bcrypt.compare(this.password, password);
}



export const User = mongoose.model("User", userSchema);

// Srajan , srajan, sRajan, srAjan -> srajan