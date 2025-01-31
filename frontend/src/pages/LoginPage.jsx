import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import {
  Eye,
  EyeOff,
  Loader2,
  LockIcon,
  Mail,
  MessagesSquare,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIng } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* logo  */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-[#7480ff]/10 flex items-center justify-center group-hover:bg-[#7480ff]/20 transition-colors">
                <MessagesSquare className="size-6 text-[#7480ff]" />
              </div>
              <h1 className="font-bold mt-2 text-2xl">Welcome Back</h1>
              <p className="">Sign in to your account</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className=" ">
              <label htmlFor="" className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative border p-3 rounded-md mt-2">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base/40" />
                </div>
                <input
                  type="text"
                  className=" border-none outline-0 w-full  pl-10 "
                  required
                  placeholder="jhoneDoe@gmail.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>
            <div className=" ">
              <label htmlFor="" className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative border p-3 rounded-md mt-2">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockIcon className="size-5 text-base/40" />
                </div>
                <input
                  type={showPassword ? "password" : "text"}
                  className=" border-none outline-0 w-full  pl-10 "
                  placeholder="Jhone Doe"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute pr-3 flex items-center right-0 inset-y-0"
                >
                  {showPassword ? (
                    <Eye className="size-5" />
                  ) : (
                    <EyeOff className="size-5" />
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-[#7480ff] p-3 rounded-md cursor-pointer flex items-center justify-center"
              disabled={isLoggingIng}
            >
              {isLoggingIng ? (
                <>
                  <Loader2 className="size-5 animate-spin mr-2" />
                  Loading...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>
          <div className="text-center">
            <p className="text-base text-gray-300 font-semibold">
              Don't  have an account?
              <Link to={"/signup"} className="text-[#7480ff] pl-2">
               Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
      <AuthImagePattern
        title="Welcome back"
        subtitle="Sign in to continue your conversations and catch up with your message"
      />
    </div>
  );
};

export default LoginPage;
