import Chat_input from "./Chat_input";
import { useState, useEffect, useRef } from "react";
import UserAvatar from "./UserAvatar";
import useSendMessage from "../Hooks/useSendMessage";
import useReadMessage from "../Hooks/useReadMessage";
import { getAuth } from "firebase/auth";

export default function Chat_PrivateRoom(props) {
  const Auth = getAuth();

  let location = props.id;

  const hook = useReadMessage(location);

  const [message, setMessage] = useState("");

  const messagesContainerRef = useRef(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      const lastMessage = messagesContainerRef.current.lastChild;
      if (lastMessage) {
        lastMessage.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hook.messages]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      console.log("Enter key pressed. Input value:", message);
      location = props.id;
      useSendMessage(location, message);
      setMessage("");
    }
  };
  return (
    <div
      ref={messagesContainerRef}
      className=" h-dvh w-dvw bg-[#1c212c] text-white z-10 overflow-scroll flex flex-col justify-end "
    >
      {hook.messages.map((chat) => (
        <div className="flex items-center mb-2 ml-5" key={chat.id}>
          <UserAvatar id={chat.uid} />
          <div className="">
            <span className="block">{chat.sender}</span>
            <span className="">{chat.message}</span>
          </div>
        </div>
      ))}
      <div className="lg:mt-15">
        <Chat_input
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          value={message}
        />
      </div>
    </div>
  );
}
