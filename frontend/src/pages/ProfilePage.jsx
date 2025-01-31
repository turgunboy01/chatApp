import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import avatar from "../assets/avatar.png";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { isUpdatingProfile, updateProfile, authUser } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null);
  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="h-screen py-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-2">Your profile informations</p>
          </div>

          {/* avatar  */}

          <div className="flex flex-col items-center gap-4">
            <div className="relative  ">
              <div className="rounded-full  border-[6px] overflow-hidden">
                <img
                  src={selectedImage || authUser.profilePic || avatar}
                  alt=""
                  className="w-[150px] h-[150px] object-cover "
                />
              </div>
              <label
                htmlFor="avatar-upload"
                className={`absolute right-0 bottom-0 hover:scale-105 p-2 rounded-full cursor-pointer duration-200 transition-all ${
                  isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                }`}
              >
                <Camera className="w-10 h-10 rounded-full right-0 bg-[#a1aebf] text-[#000] p-2 absolute -top-5" />
                <input
                  type="file"
                  id="avatar-upload"
                  accept="image/*"
                  disabled={isUpdatingProfile}
                  onChange={handleUploadImage}
                  className="hidden "
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile
                ? "Uploading"
                : "Click the camera icon to update your photo"}
            </p>
          </div>
          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm flex items-center gap-2 text-zinc-400">
                <User className="w-4 h-4" /> Full Name
              </div>
              <p className="px-4 py-2.5 bg-[#272f3885]  rounded-lg border">
                {authUser.fullName}
              </p>
            </div>
            <div className="space-y-1.5">
              <div className="text-sm flex items-center gap-2 text-zinc-400">
                <Mail className="w-4 h-4" /> Email Adress
              </div>
              <p className="px-4 py-2.5 bg-[#272f3885]  rounded-lg border">
                {authUser.email}
              </p>
            </div>
          </div>
          <div className="mt-8 p-6 rounded-xl ">
            <h2 className="text-lg mb-4 font-medium">Account Information</h2>
            <div className="text-sm space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
