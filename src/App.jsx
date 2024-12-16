import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from './Component/Footer/Footer'
import Navbar from './Component/Navbar/Navbar'
import { ThemeProvider } from './Context/ThemeContext'
import Dashboard from './Pages/Dashboard/Dashboard'
import ManageUsers from "./Pages/ManageUsers/ManageUser";
import Permission from "./Pages/ManagerPermission/Permission";
import ManageRoles from "./Pages/ManagerRoles/ManageRoles";


function App() {

  return (
    <ThemeProvider>
      <div style={{ width: "100%" }}>
        <Router>
          {/* Navbar */}
          <Navbar />

          {/* Main content container */}
          <div className="container">
            <Routes>
              {/* AdminControl Routes */}
              <Route exact path="/" element={<Dashboard />} />
              <Route exact path="/manageuser" element={<ManageUsers />} />
              <Route exact path="/managerole" element={<ManageRoles />} />
              <Route exact path="/managepermission" element={<Permission />} />
            </Routes>
          </div>

          {/* Footer Section */}
          <Footer />
        </Router>
      </div>
    </ThemeProvider>
  )
}

export default App
