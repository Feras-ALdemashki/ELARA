import { useState } from "react";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { PiEyeLight, PiEyeClosedThin } from "react-icons/pi";
import { toast } from "react-hot-toast";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
const Signup = () => {
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid email address");
      return;
    }

    toast.success("Signed up successfully!");
    //api call
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-sm p-8">
        {/* Logo & Title */}
        <div className="text-center mb-8 flex items-center justify-center">
          <img src={logo} alt="E Logo" className="h-10 w-10 mr-1" />
          <span className="text-2xl font-bold tracking-widest text-primary">
            LARA
          </span>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSignup} className="space-y-4">
          {/*  Name */}
          <div className="flex items-center border-b border-primary py-2">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder=" Name"
              className="w-full bg-transparent outline-none text-primary placeholder-gray-400"
            />
          </div>

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

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full border border-primary text-primary py-2 rounded-md font-semibold 
              hover:bg-primary hover:text-accent transition-colors cursor-pointer"
          >
            SIGN UP
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-primary cursor-pointer"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
