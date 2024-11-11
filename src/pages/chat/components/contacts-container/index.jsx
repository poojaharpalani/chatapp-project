import React, { useEffect } from "react";
import ProfileInfoComponent from "./components";
import Newdm from "@/pages/chat/components/contacts-container/components/new-dm/index";
import { apiClient } from "@/lib/api-client";
import {
  GET_DM_CONTACTS_ROUTES,
  GET_USER_CHANNELS_ROUTE,
} from "@/utils/constants";
import { useAppstore } from "@/store";
import ContacList from "../contact-list";
import CreateChannel from "@/pages/chat/components/contacts-container/components/create-channel/index";

const ContactsContainer = () => {
  const {
    setDirectMessagesContacts,
    directMessagesContacts,
    channels,
    setChannels,
  } = useAppstore();
  useEffect(() => {
    const getContacts = async () => {
      const response = await apiClient.get(GET_DM_CONTACTS_ROUTES, {
        withCredentials: true,
      });
      if (response.data.contacts) {
        setDirectMessagesContacts(response.data.contacts);
      }
    };
    const getChannels = async () => {
      const response = await apiClient.get(GET_USER_CHANNELS_ROUTE, {
        withCredentials: true,
      });
      if (response.data.channels) {
        setChannels(response.data.channels);
      }
    };

    getContacts();
    getChannels();
  }, [setChannels, setDirectMessagesContacts]);
  return (
    <div className="relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r-2 border-[#2f303b] w-full">
      <div className="pt-3">
        <Logo></Logo>
      </div>
      <div className="my-5">
        <div className="flex items-center justify-center pr-10 ">
          <Title text="Direct Messages"></Title>
          <Newdm></Newdm>
        </div>
        <div className="max-h-[38vh] overflow-y-auto  scrollbar-hidden">
          <ContacList contacts={directMessagesContacts}></ContacList>
        </div>
      </div>
      <div className="my-5">
        <div className="flex items-center justify-center pr-10 ">
          <Title text="Channels"></Title>
          <CreateChannel></CreateChannel>
        </div>
        <div className="max-h-[38vh] overflow-y-auto  scrollbar-hidden">
          <ContacList contacts={channels} isChannel={true}></ContacList>
        </div>
      </div>
      <ProfileInfoComponent></ProfileInfoComponent>
    </div>
  );
};

export default ContactsContainer;

const Logo = () => {
  return (
    <div className="flex p-5  justify-start items-center gap-2">
      <svg
        id="logo-38"
        width="78"
        height="32"
        viewBox="0 0 78 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {" "}
        <path
          d="M55.5 0H77.5L58.5 32H36.5L55.5 0Z"
          className="ccustom"
          fill="#8338ec"
        ></path>{" "}
        <path
          d="M35.5 0H51.5L32.5 32H16.5L35.5 0Z"
          className="ccompli1"
          fill="#975aed"
        ></path>{" "}
        <path
          d="M19.5 0H31.5L12.5 32H0.5L19.5 0Z"
          className="ccompli2"
          fill="#a16ee8"
        ></path>{" "}
      </svg>
      <span className="text-3xl font-semibold text-white">Syncronus</span>
    </div>
  );
};

//   export default Logo;
const Title = ({ text }) => {
  return (
    <h6 className="uppercase tracking-widest text-neutral-400 pl-10 font-light text-opaacity-90 text-sm">
      {text}
    </h6>
  );
};
