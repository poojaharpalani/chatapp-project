// import { useAppstore } from "@/store";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";

// const Chat = () => {
//   const { userInfo } = useAppstore();
//   const navigate = useNavigate();
//   useEffect(() => {
//     if (userInfo && !userInfo.profileSetup)
//       toast("Please set up profile to continue ");
//     navigate("/profile");
//   }, [userInfo, navigate]);

//   return <div>Chat</div>;
// };
// export default Chat;

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAppstore } from "@/store";
import ContactsContainer from "./components/contacts-container";
import EmptyChatContainer from "./components/empty-chat-container";
import ChatContainer from "./components/chat-container";
export default function ChatPage() {
  const {
    userInfo,
    selectedChatType,
    isUploading,
    isDownloading,
    fileUploadProgress,
    fileDownloadProgress,
  } = useAppstore();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo && !userInfo.profileSetup) {
      toast("Please setup profile to continue.");
      navigate("/profile");
    }
  }, [userInfo, navigate]);

  return (
    <div className="flex h-screen text-black overflow-hidden">
      {isUploading && (
        <div className="h-[100vh] w-[100vw] fixed top-0 z-10 left-0 bg-black/80 flex items-center justify-center flex-col gap-5 backdrop-blur-lg text-white">
          <h5 className="text-5xl animate-pulse text-white">Uploading File</h5>
          {fileUploadProgress}%
        </div>
      )}
      {isDownloading && (
        <div className="h-[100vh] w-[100vw] fixed top-0 z-10 left-0 bg-black/80 flex items-center justify-center flex-col gap-5 backdrop-blur-lg text-white">
          <h5 className="text-5xl animate-pulse text-white">
            Downloading File
          </h5>
          {fileDownloadProgress}%
        </div>
      )}
      <ContactsContainer></ContactsContainer>
      {selectedChatType === undefined ? (
        <EmptyChatContainer></EmptyChatContainer>
      ) : (
        <ChatContainer></ChatContainer>
      )}
    </div>
  );
}
