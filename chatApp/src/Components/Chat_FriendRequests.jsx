import { useState } from "react";
import {
  getDatabase,
  ref,
  set,
  update,
  get,
  runTransaction,
  onValue,
  DataSnapshot,
} from "firebase/database";
import { getAuth } from "firebase/auth";

function Chat_FriendRequests() {
  const [pendingRequests, setPendingRequests] = useState([]);
  const Auth = getAuth();
  const Database = getDatabase();

  const userId = Auth.currentUser.uid;

  const friendRequestRef = ref(Database, `/users/${userId}/friendRequest`);

  onValue(friendRequestRef, (snapshot) => {
    console.log(snapshot.val());
    snapshot.val().map((x) => {
      if (x.receiver) {
        onValue(ref(Database, `/users/${x.receiver}/username`), (snapshot) => {
          console.log(snapshot.val());
          setPendingRequests([...pendingRequests, snapshot.val()]);
        });
      }
    });
  });

  const listOfRequests = pendingRequests.map((x) => {
    <li>{x}</li>;
  });

  return (
    <div>
      <ul>{listOfRequests}</ul>
    </div>
  );
}

export default Chat_FriendRequests;
