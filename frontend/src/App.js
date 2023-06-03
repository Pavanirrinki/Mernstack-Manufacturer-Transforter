import logo from './logo.svg';
import './App.css';
import Landingpage from './Pages/Landingpage';
import { BrowserRouter, Route, Routes,useLocation } from 'react-router-dom';
import Signup from './Pages/Signup';
import Manufacturerdashboard from './Pages/Manufacturerdashboard';
import Transporterdashboard from './Pages/Transporterdashboard';
import Addorder from './Pages/Addorder';
import React, { useState, useEffect } from "react";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <RoutingComponent />
      </BrowserRouter>
    </div>
  );
}

function RoutingComponent() {
  const [response, setResponse] = useState(null);
  const location = useLocation();

  useEffect(() => {
    checkUsersInformation();
  }, [location.pathname]);

  const checkUsersInformation = () => {
    const usersrole = JSON.parse(localStorage.getItem("usersinformation"));
    const role = usersrole?.existingUser.Role;
    setResponse(role);
  };

  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          response === "Manufacturer" ? (
            <Manufacturerdashboard />
          ) : (
            <Transporterdashboard />
          )
        }
      />
      <Route path="/" element={<Landingpage />} />
      <Route path="/Registration-form" element={<Signup />} />
      <Route path="/add-order" element={<Addorder />} />
    </Routes>
  );
}

export default App;

