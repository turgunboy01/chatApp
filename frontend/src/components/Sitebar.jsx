import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import SitebarSkeleton from "./skelaton/SitebarSkeleton";
import { Users } from "lucide-react";
import avatar from "../assets/avatar.png";
import { useAuthStore } from "../store/useAuthStore";

const Sitebar = () => {
  const { getUsers, setSelectedUser, users, selectedUser, isUserLoading } =
    useChatStore();

  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);
  if (isUserLoading) return <SitebarSkeleton />;
  return (
    <div className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b w-full p-5 border-base-300">
        <div className="flex items-center  gap-2">
          <Users className="w-6 h-6" />
          <span className=" font-medium hidden lg:block">Contacts</span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3">
        {users.map((user) => (
          <button
            key={user._id}
            className={` w-full p-3 flex gap-3 items-center hover:bg-base-300 transition-colors ${
              selectedUser?._id === user._id
                ? "bg-base-300 ring-1 ring-base-300"
                : ""
            }`}
            onClick={() => setSelectedUser(user)}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || avatar}
                alt={user.name}
                className="size-12 object-cover rounded-full"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900" />
              )}
            </div>

            <div className=" hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{user.fullName}</div>
              <div className="text-sm text-zinc-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sitebar;
