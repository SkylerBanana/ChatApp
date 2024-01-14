import Chat_input from "./Chat_input";
import {
  getDatabase,
  ref,
  get,
  runTransaction,
  push,
  set,
  onValue,
} from "firebase/database";
import { getAuth } from "firebase/auth";
import { useState, useEffect } from "react";
export default function Chat_GlobalRoom() {
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");

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

            return {
              id: property,
              sender: messages[property].sender,
              senderName: senderName,
              message: messages[property].message,
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

  function sendMessage() {
    const globalChatRef = ref(Database, `/users/globalChat`); // getting a database reference
    const newMessage = push(globalChatRef);
    set(newMessage, {
      sender: auth.currentUser.displayName,
      message: message,
    });
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      console.log("Enter key pressed. Input value:", message);
      sendMessage();
      setMessage("");
    }
  };

  return (
    <div className=" h-dvh w-dvw bg-[#1c212c] text-white z-10">
      {chat.map((chat) => (
        <div className="flex items-start" key={chat.id}>
          <img
            className="w-10 h-10 mr-3"
            src="https://cdn.discordapp.com/attachments/1092285231689646112/1194653934585917560/Default_pfp.svg.png?ex=65b1232d&is=659eae2d&hm=797ab873a71590a7577ac85cd4d7f718528b18102c9268f8ec7a5f43702e5186&"
          ></img>

          <div className="mb-2">
            <span className="block">{chat.senderName}</span>
            <span className="">{chat.message}</span>
          </div>
        </div>
      ))}
      <Chat_input
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        value={message}
      />
    </div>
  );
}
