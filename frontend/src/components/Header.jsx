import { Navbar, Dropdown, Avatar } from "flowbite-react"
import {useState} from 'react'

const Header = () => {
    const [isLoggedin, setIsLoggedin] = useState(false)

    const handleSignOut = () =>{
        setIsLoggedin(false)
    }

    return (
        <>
            <Navbar fluid rounded>
                <Navbar.Brand href="https://flowbite-react.com">
                    <img src="public/images/logo.png" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Latest Tech Blogs</span>
                </Navbar.Brand>
                <div className="flex md:order-2">
                {
                    isLoggedin ?
                    (<Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
                        }
                    >
                        <Dropdown.Header>
                            <span className="block text-sm">Bonnie Green</span>
                            <span className="block truncate text-sm font-medium">name@flowbite.com</span>
                        </Dropdown.Header>
                        <Dropdown.Item>Dashboard</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
                    </Dropdown>) : 
                    (
                        <a href="/login" > Login </a>
                    )
                }   
                    <Navbar.Toggle />
                </div>
                <Navbar.Collapse>
                    <Navbar.Link href="#" active>
                        Home
                    </Navbar.Link>
                    <Navbar.Link href="#">About</Navbar.Link>
                    <Navbar.Link href="#">Services</Navbar.Link>
                    <Navbar.Link href="#">Pricing</Navbar.Link>
                    <Navbar.Link href="#">Contact</Navbar.Link>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

export { Header }