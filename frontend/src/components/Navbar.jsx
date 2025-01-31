import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  

  return (
    <header className=" border-b fixed w-full top-0 z-40 backdrop-blur-lg  bg-[#1a1f25] border-[#adabab21]">
      <div className="container px-5 mx-auto h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link
              to={"/"}
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className=" size-9 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5 " />
              </div>
              <h1 className="font-bold text-lg">Chatty</h1>
            </Link>
          </div>
          <div className="flex items-center gap-5">
            <Link
              to={"/settings"}
              className="flex items-center gap-1 hover:opacity-80 transition-all"
            >
              <div className=" size-9 rounded-lg flex items-center justify-center">
                <Settings className="w-5 h-5 " />
              </div>
              <h1 className="hidden sm:inline">Settings</h1>
            </Link>
            {authUser && (
              <>
                <Link to={"/profile"} className=" flex items-center gap-1">
                  <User className="size-5" />
                  <h1 className="hidden sm:inline">Profile</h1>
                </Link>
                <button className="flex items-center gap-1" onClick={logout}>
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
