import { Users } from "lucide-react";
import React from "react";

const SitebarSkeleton = () => {
  const skeletonContacts = Array(8).fill(null);

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      {/* header  */}
      <div className="border-b w-full p-5 border-base-300">
        <div className="flex items-center  gap-2">
          <Users className="w-6 h-6" />
          <span className=" font-medium hidden lg:block">Contacts</span>
        </div>
      </div>

      {/* Skeleton contacts  */}

      <div className="w-full py-3 overflow-y-auto">
        {skeletonContacts.map((_, idx) => (
          <div key={idx} className="flex items-center w-full gap-3 p-3">
            <div className=" relative mx-auto lg:mx-0">
              <div className="skeleton size-12 rounded-full"></div>
            </div>

            {/* // user info skeleton only visibled on larger screems */}

            <div className="hidden lg:block">
              <div className="skeleton h-4 w-32 mb-2" />
              <div className="skeleton h-3 w-16 " />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SitebarSkeleton;
