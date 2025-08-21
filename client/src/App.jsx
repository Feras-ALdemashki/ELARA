import "./App.css";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Home from "./pages/Dashboard/Home";
import Income from "./pages/Dashboard/Income";
import Expenses from "./pages/Dashboard/Expenses";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { toastOptions } from "./utils/toastOptions";
import { AuthProvider } from "./context/AuthProvider";
import { AuthContext } from "./context/AuthContext"; // <-- important
import { useContext } from "react";

function App() {
  return (
    <AuthProvider>
      <Toaster toastOptions={toastOptions} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootRedirect />} />
          <Route
            path="/login"
            element={
              <AuthRoute>
                <Login />
              </AuthRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthRoute>
                <Signup />
              </AuthRoute>
            }
          />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/income"
            element={
              <ProtectedRoute>
                <Income />
              </ProtectedRoute>
            }
          />
          <Route
            path="/expenses"
            element={
              <ProtectedRoute>
                <Expenses />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

// Redirects "/" based on login state
const RootRedirect = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  return user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
};

// Protects routes that require login
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  console.log(user);
  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" />;

  return children;
};
const AuthRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  if (user) return <Navigate to="/dashboard" replace />; // logged-in users can't go here

  return children; // guests can access
};
