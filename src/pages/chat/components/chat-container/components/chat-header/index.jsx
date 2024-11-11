import { useAppstore } from "@/store";
import React from "react";
import { RiCloseFill } from "react-icons/ri";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getColor } from "@/lib/utils";

const ChatHeader = () => {
  const { closeChat, selectedChatData, selectedChatType } = useAppstore();

  // Define HOST correctly
  const HOST = import.meta.env.VITE_SERVER_URL || "http://localhost:5000";

  // Log the selectedChatData for debugging
  console.log("Selected Chat Data:", selectedChatData);

  // Construct the image URL if available
  const imageUrl = selectedChatData?.image
    ? `${HOST}/${selectedChatData.image}`
    : null;

  // Debugging console logs
  console.log("Image URL:", imageUrl);

  // Fallback handling for initials if image is not available
  const firstNameInitial = selectedChatData?.firstName?.charAt(0) || "";
  const emailInitial = selectedChatData?.email?.charAt(0) || "";
  const displayInitial = firstNameInitial || emailInitial || "N"; // Default to 'N' if both are absent

  return (
    <div className="h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-between px-20">
      <div className="flex gap-5 items-center w-full justify-between">
        <div className="flex gap-3 items-center justify-center ">
          <div className="w-12 h-12 relative">
            {selectedChatType === "contact" ? (
              <Avatar className="h-12 w-12 rounded-full overflow-hidden">
                {imageUrl ? (
                  <AvatarImage
                    src={imageUrl}
                    alt="profile"
                    className="object-cover w-full h-full bg-black"
                  />
                ) : (
                  <div
                    className={`uppercase h-12 w-12 text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(
                      selectedChatData?.Color || "bg-gray-500"
                    )}`}
                  >
                    {displayInitial}
                  </div>
                )}
              </Avatar>
            ) : (
              <div className="bg-[#ffffff22] h-10 w-10 flex items-center justify-center rounded-full">
                #
              </div>
            )}
          </div>
          <div className="text-white">
            {selectedChatType === "channel" && selectedChatData.name}
            {selectedChatType === "contact" && selectedChatData.firstName
              ? `${selectedChatData.firstName}  ${selectedChatData.lastName}`
              : selectedChatData.email}
          </div>
        </div>
        <div className="flex items-center justify-center gap-5">
          <button
            className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
            onClick={closeChat}
          >
            <RiCloseFill className="text-3xl"></RiCloseFill>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
