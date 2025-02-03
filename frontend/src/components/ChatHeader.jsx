import React from "react";
import { useChatStore } from "../store/useChatStore";
import avatar from "../assets/avatar.png";
import { useAuthStore } from "../store/useAuthStore";
import { X } from "lucide-react";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex justify-between items-center px-2">
        <div className="flex items-center gap-3">
          <img
            src={selectedUser.profilePic || avatar}
            alt={selectedUser.fullName}
            className="size-10 rounded-full relative object-cover"
          />
          <div className="">
            <h3 className="font-medium">{selectedUser.fullName}</h3>
            <p>
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>
        <button onClick={() => setSelectedUser(null)}>
          <X />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
