import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home.jsx"
import {Header} from "./components/Header.jsx"
import {Login} from "./pages/Login.jsx"
import {Register } from "./pages/Register.jsx"
import { useEffect , useState} from "react"
import axios from "axios"


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.post('http://localhost:8000/api/user/currentUser', { withCredentials: true });
        console.log('User Data:', response.data);
        setUser(response.data.data);
        // Add any additional handling after API call
      } catch (error) {
        console.error('API Error:', error.response.data.message);
        // Handle API error
      }
    }
    fetchUser();
  }, []);

  return (
    <BrowserRouter>
      <Header user = {user}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
