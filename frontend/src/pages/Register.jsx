import { Label, FileInput, TextInput } from "flowbite-react"

const Register = () => {
    return (
        <>

            <div className="w-[100%] flex flex-col items-center py-12">
                {/* upload file - avatar */}
                <div className="mb-4 w-3/5">
                    <div>
                        <Label htmlFor="avatar" value="Upload Your Avatar" />
                    </div>
                    <FileInput id="avatar" sizing="lg" />
                </div>

                {/* User name */}
                <div className="w-3/5 mb-4">
                    <div className="mb-2 block">
                        <Label htmlFor="username" value="Your Username (Unique)" />
                    </div>
                    <TextInput id="username" type="username" placeholder="Srajan123" required />
                </div>

                {/* Email */}
                <div className="w-3/5 mb-4">
                    <div className="mb-2 block">
                        <Label htmlFor="email" value="Your Email" />
                    </div>
                    <TextInput id="email" type="email" placeholder="abc@abc.com" required />
                </div>

                {/* Password */}
                <div className="w-3/5 mb-4">
                    <div className="mb-2 block">
                        <Label htmlFor="password" value="Your Password" />
                    </div>
                    <TextInput id="password" type="password" placeholder="Must Include (!@#$%^&*())" required />
                </div>

                {/* Confirm Password */}
                <div className="w-3/5 mb-4">
                    <div className="mb-2 block">
                        <Label htmlFor="confirmPassword" value="Your Confirm Password" />
                    </div>
                    <TextInput id="confirmPassword" type="password" placeholder="Must Be same as upper" required />
                </div>

                {/* Submit Button */}
                <div className="w-3/5">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Register
                    </button>
                </div>

            </div>
        </>
    )
}

export { Register }