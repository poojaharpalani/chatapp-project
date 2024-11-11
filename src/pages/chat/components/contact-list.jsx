import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useAppstore } from "@/store";
import { HOST } from "@/utils/constants";
import { getColor } from "@/lib/utils";

const ContactList = ({ contacts, isChannel = false }) => {
  const {
    selectedChatData,
    setSelectedChatData,
    setSelectedChatType,
    selectedChatType,
    setSelectedChatMessages,
  } = useAppstore();

  const handleClick = (contact) => {
    if (isChannel) setSelectedChatType("channel");
    else setSelectedChatType("contact");
    setSelectedChatData(contact);
    if (selectedChatData && selectedChatData._id !== contact._id) {
      setSelectedChatMessages([]);
    }
  };

  return (
    <div className="mt-4 space-y-2">
      {contacts.map((contact) => (
        <div
          key={contact._id}
          className={`pl-8 py-3 rounded-lg transition-all duration-300 cursor-pointer shadow-sm ${
            selectedChatData && selectedChatData._id === contact._id
              ? "bg-[#6b21a8] text-white shadow-md"
              : "hover:bg-[#f0f0f033] text-neutral-200"
          }`}
          onClick={() => handleClick(contact)}
        >
          <div className="flex items-center gap-4">
            {!isChannel ? (
              <Avatar className="h-10 w-10 rounded-full">
                {contact.image ? (
                  <AvatarImage
                    src={`${HOST}/${contact.image}`}
                    alt="profile"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div
                    className={`h-10 w-10 flex items-center justify-center rounded-full text-lg font-semibold ${getColor(
                      contact.color
                    )}`}
                  >
                    {contact.firstName
                      ? contact.firstName.charAt(0).toUpperCase()
                      : contact.email.charAt(0).toUpperCase()}
                  </div>
                )}
              </Avatar>
            ) : (
              <div className="bg-[#ffffff22] h-10 w-10 flex items-center justify-center rounded-full">
                #
              </div>
            )}

            <span className="text-sm font-medium text-gray-300">
              {isChannel
                ? contact.name
                : contact.firstName && contact.lastName
                ? `${contact.firstName} ${contact.lastName}`
                : contact.email}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactList;
