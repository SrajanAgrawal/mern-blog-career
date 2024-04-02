import { Navbar, Dropdown, Avatar } from "flowbite-react"
import { useEffect, useState } from 'react'
import {useSelector} from 'react-redux' // 1st line

const Header = () => {
    const user = useSelector(state => state.user.currentUser) // 2nd line
    console.log(user);
    const [isLoggedin, setIsLoggedin] = useState(false)

    useEffect(() => {
        if (user) {
            setIsLoggedin(true)
        }
    }, [user])

    const handleSignOut = () => {
        // sign out api call
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
                                    <Avatar alt="User settings" img={user.avatar} rounded />
                                }
                            >
                                <Dropdown.Header>
                                    <span className="block text-sm">{user.username}</span>
                                    <span className="block truncate text-sm font-medium">{user.email}</span>
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