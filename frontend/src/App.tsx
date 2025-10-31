import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Layout from "./Layout"
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          {/* Authentication Routes  */}
          <Route path={'/register'} element={<Register />} />
          <Route path={'/login'} element={<Login />} />

          <Route path="/admin" element={<Layout />} >
            <Route path="dashboard" element={<div className="p-4">Welcome to the Admin Dashboard</div>} />
            <Route path="form" element={<div className="p-4">Welcome to the Admin form</div>} />
          </Route>

        </Routes>
      </Router>
    </>
  )
}

export default App
