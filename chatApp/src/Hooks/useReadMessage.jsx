import { getDatabase, ref, push, set, onValue } from "firebase/database";
import { useState, useEffect, useRef } from "react";
import { getAuth } from "firebase/auth";

function useReadMessage(location) {
  const Database = getDatabase();
  const auth = getAuth();
  const currentUserUid = auth.currentUser.uid;

  useEffect(() => {
    if (!currentUserUid) {
      return;
    }
    if (location === "globalChat") {
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

          return [...newmessages];
        }
      });

      return () => {
        globalChatRefListener();
      };
    } else {
      const userChatRef = ref(
        Database,
        `/users/${location}/messages/${currentUserUid}`
      );
      const userChatRefListener = onValue(userChatRef, async (snapshot) => {
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

          return [...newmessages];
        }
      });

      return () => {
        userChatRefListener();
      };
    }
  }, [Database]);
}

export default useReadMessage;
