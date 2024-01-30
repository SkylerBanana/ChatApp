import { getDatabase, ref, push, set } from "firebase/database";
import { getAuth } from "firebase/auth";

function useSendMessage(location, message) {
  const Database = getDatabase();
  const auth = getAuth();

  const currentUserUid = auth.currentUser ? auth.currentUser.uid : null;

  if (!currentUserUid) {
    console.error("No user is currently signed in.");
    return;
  }
  if (location === "globalChat") {
    const globalChatRef = ref(Database, `/users/${location}`);
    const newMessage = push(globalChatRef);
    set(newMessage, {
      sender: auth.currentUser.displayName,
      message: message,
      uid: currentUserUid,
    });
  } else {
    // the code below this line deals with direct messaging cause if we arent sending a message to global chat the only other place we can is directly
    const receiverChatRef = ref(
      Database,
      `/users/${location}/messages/${currentUserUid}`
    );
    const newReceiverMessage = push(receiverChatRef);
    set(newReceiverMessage, {
      sender: auth.currentUser.displayName,
      message: message,
      uid: currentUserUid,
      receiverID: location,
    });
    const senderChatRef = ref(
      Database,
      `/users/${currentUserUid}/messages/${location}`
    );
    const newSenderMessage = push(senderChatRef);
    set(newSenderMessage, {
      sender: auth.currentUser.displayName,
      message: message,
      uid: currentUserUid,
      receiverID: location,
    });
  }
}

export default useSendMessage;
