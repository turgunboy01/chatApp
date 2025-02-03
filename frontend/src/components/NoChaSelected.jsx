import { MessagesSquare } from "lucide-react";
import React from "react";

const NoChaSelected = () => {
  return (
    <div className="w-full flex flex-1   flex-col items-center justify-center p-16 bg-base-100/50">
      <div className="max-w-md  space-y-6 text-center">
        <div className="flex justify-center mb-4 gap-4">
          <div className="relative">
            <div className="animate-bounce flex justify-center items-center w-16 h-16 rounded-2xl bg-primary/10">
              <MessagesSquare className="w-8 h-8 text-primary" />
            </div>
          </div>
        </div>
        <h2 className="text-2xl font-bold">Welcome to Chattly!</h2>
        <p className="text-base-content/60">
          Select a coversation from the sitebar to start chatting
        </p>
      </div>
    </div>
  );
};

export default NoChaSelected;
