import { useState, useEffect } from "react";
import {
  getDatabase,
  ref,
  onValue,
  get,
  child,
  remove,
} from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Chat_FriendRequests() {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [userId, setUserId] = useState(null);
  const Database = getDatabase();
  const Auth = getAuth();

  async function getUsername(usernameRef) {
    const userIdRef = ref(Database);

    try {
      const snapshot = await get(child(userIdRef, `/users/${usernameRef}`));

      if (snapshot.exists()) {
        return snapshot.val().username;
      } else {
        console.log("Username not found for", usernameRef);
        return null;
      }
    } catch (error) {
      console.error("Error fetching username:", error.message);
      return null;
    }
  }

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(Auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribeAuth();
  }, [Auth]);

  useEffect(() => {
    if (!userId) {
      return;
    }

    const friendRequestRef = ref(Database, `/users/${userId}/friendrequests`);
    const friendRequestsListener = onValue(
      friendRequestRef,
      async (snapshot) => {
        if (snapshot.exists()) {
          const requests = snapshot.val();
          const requestKeys = Object.keys(requests);

          const newRequests = await Promise.all(
            requestKeys.map(async (property) => {
              const senderName = await getUsername(requests[property].sender);

              return {
                id: property,
                sender: requests[property].sender,
                senderName: senderName,
              };
            })
          );

          setPendingRequests(() => [...newRequests]);
        }
      }
    );

    return () => {
      friendRequestsListener();
    };
  }, [Database, userId]);

  function reject(requestid) {
    //if u click reject button it should remove the freind request from the database
    remove(
      ref(
        Database,
        `/users/${Auth.currentUser.uid}/friendrequests/${requestid}`
      )
    );
    setPendingRequests((prevRequests) => {
      prevRequests.filter((x) => {
        x.id !== id;
      });
    });
  }

  const listOfRequests = pendingRequests.map((x) => (
    <div key={x.id}>
      <li>{x.senderName}</li>

      <button
        onClick={() => {
          reject(x.id);
        }}
      >
        test
      </button>
    </div>
  ));

  return (
    <div>
      <ul>{listOfRequests}</ul>
    </div>
  );
}

export default Chat_FriendRequests;
