import { getDatabase, ref, push, set, onValue } from "firebase/database";
import { useState, useEffect, useRef } from "react";
import { getAuth } from "firebase/auth";

function useReadMessage(location) {
  const Database = getDatabase();
  const auth = getAuth();
  const currentUserUid = auth.currentUser?.uid;

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!currentUserUid) {
      return;
    }

    let chatRef;
    if (location === "globalChat") {
      chatRef = ref(Database, `/users/globalChat`);
    } else {
      chatRef = ref(Database, `/users/${currentUserUid}/messages/${location}`);
    }

    const chatRefListener = onValue(chatRef, (snapshot) => {
      if (snapshot.exists()) {
        const messagesData = snapshot.val();
        const messageArray = Object.keys(messagesData).map((property) => ({
          id: property,
          sender: messagesData[property].sender,
          senderName: messagesData[property].senderName,
          message: messagesData[property].message,
          uid: messagesData[property].uid,
        }));
        setMessages(messageArray);
      } else {
        setMessages([]);
      }
    });

    return () => {
      chatRefListener();
    };
  }, [Database, location, currentUserUid]);

  return { messages };
}

export default useReadMessage;
