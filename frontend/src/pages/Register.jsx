import { Label, FileInput, TextInput } from "flowbite-react";
import { useState } from "react";
import {useNavigate} from "react-router-dom"
import axios from "axios";

const Register = () => {
    const navigate = useNavigate()


    const [avatar, setAvatar] = useState();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Call your API using Axios here, with the form data
        try {
            if (password !== confirmPassword) {
                setError('Passwords do not match')
                console.error('Passwords do not match');
                return;
            }

            setError('Loading.........')
            const formData = new FormData();
            formData.append('avatar', avatar);
            formData.append('username', username);
            formData.append('email', email);
            formData.append('password', password);

            const config = {
                headers: {
                  'content-type': 'multipart/form-data',
                },
              };

            const response = await axios.post('http://localhost:8000/api/user/register', formData, config);
            console.log('API Response:', response.data);
            setError(response.data.messsage + "Loading.....")

            navigate("/login")
            // Add any additional handling after API call
        } catch (error) {
            setError(error.response.data.message)
            console.error('API Error:', error.response.data.message);
            // Handle API error
        }
    };

    return (
        <>
            <div className="w-[100%] flex flex-col items-center py-12">
                <h1 className="text-3xl font-bold mb-4">Register</h1>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <form className="w-[100%] flex flex-col items-center py-12" onSubmit={handleSubmit}>
                    {/* upload file - avatar */}
                    <div className="mb-4 w-3/5">
                        <div>
                            <Label htmlFor="avatar" value="Upload Your Avatar" />
                        </div>
                        <FileInput id="avatar" sizing="lg" onChange={(e) => setAvatar(e.target.files[0])} />
                    </div>

                    {/* User name */}
                    <div className="w-3/5 mb-4">
                        <div className="mb-2 block">
                            <Label htmlFor="username" value="Your Username (Unique)" />
                        </div>
                        <TextInput id="username" type="text" placeholder="Srajan123" required value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>

                    {/* Email */}
                    <div className="w-3/5 mb-4">
                        <div className="mb-2 block">
                            <Label htmlFor="email" value="Your Email" />
                        </div>
                        <TextInput id="email" type="email" placeholder="abc@abc.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    {/* Password */}
                    <div className="w-3/5 mb-4">
                        <div className="mb-2 block">
                            <Label htmlFor="password" value="Your Password" />
                        </div>
                        <TextInput id="password" type="password" placeholder="Must Include (!@#$%^&*())" required value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    {/* Confirm Password */}
                    <div className="w-3/5 mb-4">
                        <div className="mb-2 block">
                            <Label htmlFor="confirmPassword" value="Your Confirm Password" />
                        </div>
                        <TextInput id="confirmPassword" type="password" placeholder="Must Be same as upper" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>

                    {/* Submit Button */}
                    <div className="w-3/5">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export { Register };
