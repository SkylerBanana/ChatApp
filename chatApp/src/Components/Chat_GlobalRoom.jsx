import Chat_input from "./Chat_input";
import { getDatabase, ref, push, set, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import { useState, useEffect, useRef } from "react";
import UserAvatar from "./UserAvatar";
import useSendMessage from "../Hooks/useSendMessage";

export default function Chat_GlobalRoom() {
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");
  const messagesContainerRef = useRef(null);

  const Database = getDatabase();
  const auth = getAuth();
  const currentUserUid = auth.currentUser.uid;

  useEffect(() => {
    if (!currentUserUid) {
      return;
    }

    const globalChatRef = ref(Database, `/users/globalChat`); // getting a database reference
    const globalChatRefListener = onValue(globalChatRef, async (snapshot) => {
      if (snapshot.exists()) {
        const messages = snapshot.val();
        const requestKeys = Object.keys(messages);

        const newmessages = await Promise.all(
          requestKeys.map(async (property) => {
            const senderName = await messages[property].sender;
            console.log(messages);

            return {
              id: property,
              sender: messages[property].sender,
              senderName: senderName,
              message: messages[property].message,
              uid: messages[property].uid,
            };
          })
        );

        setChat(() => [...newmessages]);
      }
    });

    return () => {
      globalChatRefListener();
    };
  }, [Database]);

  useEffect(() => {
    if (messagesContainerRef.current) {
      const lastMessage = messagesContainerRef.current.lastChild;
      if (lastMessage) {
        lastMessage.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [chat]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      console.log("Enter key pressed. Input value:", message);
      const location = "globalChat";
      useSendMessage(location, message);
      setMessage("");
    }
  };

  return (
    <div
      ref={messagesContainerRef}
      className=" h-dvh w-dvw bg-[#1c212c] text-white z-10 overflow-scroll "
    >
      {chat.map((chat) => (
        <div className="flex items-start ml-4" key={chat.id}>
          <UserAvatar id={chat.uid} />
          <div className="mb-2">
            <span className="block">{chat.senderName}</span>
            <span className="">{chat.message}</span>
          </div>
        </div>
      ))}
      <div className="lg:mt-20">
        <Chat_input
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          value={message}
        />
      </div>
    </div>
  );
}
