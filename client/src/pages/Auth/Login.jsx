import { useState } from "react";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { PiEyeLight, PiEyeClosedThin } from "react-icons/pi";
import { toast } from "react-hot-toast";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid email address");
      return;
    }

    toast.success("Logged in successfully!");
    //api call
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-sm p-8">
        {/* Logo & Title */}
        <div className="text-center mb-8 flex items-center justify-center">
          {/* E as logo */}
          <img src={logo} alt="E Logo" className="h-10 w-10 mr-1" />
          {/* LARA */}
          <span className="text-2xl font-bold tracking-widest text-primary">
            LARA
          </span>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div className="flex items-center border-b border-primary py-2">
            <AiOutlineMail className="text-gray-500 mr-2" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full bg-transparent outline-none text-primary placeholder-gray-400"
            />
          </div>

          {/* Password */}
          <div className="flex items-center border-b border-primary py-2 relative">
            <AiOutlineLock className="text-gray-500 mr-2" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-transparent outline-none text-primary placeholder-gray-400"
            />
            <span
              className="absolute right-2 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <PiEyeLight /> : <PiEyeClosedThin />}
            </span>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full border border-primary text-primary py-2 rounded-md font-semibold 
              hover:bg-primary hover:text-accent transition-colors cursor-pointer"
          >
            LOG IN
          </button>
        </form>

        {/* Signup Link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-primary cursor-pointer "
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
