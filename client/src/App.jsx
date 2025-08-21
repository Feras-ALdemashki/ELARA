import "./App.css";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Home from "./pages/Dashboard/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Income from "./pages/Dashboard/Income";
import Expenses from "./pages/Dashboard/Expenses";
import { Toaster } from "react-hot-toast";
import { toastOptions } from "./utils/toastOptions";
function App() {
  return (
    <div>
      <Toaster toastOptions={toastOptions} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/income" element={<Income />} />
          <Route path="/expenses" element={<Expenses />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

const Root = () => {
  //check if user logged in check the token in session storage
  const isAuthenticated = !!sessionStorage.getItem("token");
  // redirect to dashboard if authenticated otherwise to login
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};
