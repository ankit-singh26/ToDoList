import { Route, Routes } from "react-router-dom"
import AddTask from "./pages/AddTask"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import Home from "./pages/Home"
function App() {

  return (
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path="/signup" element={<SignUp/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/add" element={<AddTask/>}></Route>
    </Routes>
  )
}

export default App
