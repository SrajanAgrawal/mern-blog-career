import { TextInput, Label, Button } from "flowbite-react"
import { useState } from 'react'
import axios from "axios"
import {useNavigate} from "react-router-dom"
import {useDispatch} from "react-redux"
import {saveUserState} from "../redux/user/userSlicer.js"

const Login = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate()

    const [error, setError] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLoginUser = async (e) => {
        e.preventDefault()
        if (email === "" || password === "") {
            setError("Please fill all the fields")
        }
        else {
            const user = {
                email: email,
                password: password
            }
            setError("Loading...")
            axios.defaults.withCredentials = true;
            // main login (api call to login user)
            await axios.post("http://localhost:8000/api/user/login", user).then((res) => {
                console.log(res.data)
                setError(res.data.message)
                // to dispatch the global state
                dispatch(saveUserState(res.data.data))
                navigate("/")
                // window.location.href = "/"

            }).catch((err) => {
                console.log(err)
                setError(err.message)
            })
        }
    }

    return (
        <>
            <form className="w-[100%] flex flex-col items-center py-12">
                {/* email */}

                <div className="w-3/5 mb-4">
                    <div className="mb-2 block">
                        <Label htmlFor="email" value="Your Email" />
                    </div>
                    <TextInput id="email" type="email" placeholder="abc@abc.com" required onChange={(e) => {
                        setEmail(e.target.value)
                    }} />
                </div>

                {/* Password */}
                <div className="w-3/5 mb-4">
                    <div className="mb-2 block">
                        <Label htmlFor="password" value="Your Password" />
                    </div>
                    <TextInput id="password" type="password" placeholder="Must Include (!@#$%^&*())" required onChange={(e) => { setPassword(e.target.value) }} />
                </div>

                {/* Submit Button */}
                <div className="w-3/5">
                    <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit" onClick={handleLoginUser}>
                        Login
                    </Button>
                </div>
                <div className="text-xl" >
                    Don't have an account? <a href="/register" className="text-blue-500">Register Here</a>
                </div>
                {
                    error ?
                        <div className="bg-red-500 text-white p-2 rounded">
                            {error}
                        </div> : ""
                }
            </form>



        </>
    )
}

export { Login }