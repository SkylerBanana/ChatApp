import { useState, useEffect } from "react";
import {
  getDatabase,
  ref,
  onValue,
  get,
  child,
  remove,
  set,
} from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { FaX } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";

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

    const friendRequestRef = ref(Database, `/users/${userId}/friendrequests`); // getting a database reference
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
  function accept(senderId, senderName, requestid) {
    const friendslistref = ref(
      Database,
      `/users/${Auth.currentUser.uid}/friends/${senderId}`
    );
    set(friendslistref, {
      username: senderName,
    });

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
    <div
      key={x.id}
      className="text-white flex align-center justify-center mt-5"
    >
      <li className="mr-2">{x.senderName}</li>
      <FaCheck
        className="mr-1 mt-1.5 text-[#16a34a]"
        onClick={() => {
          accept(x.sender, x.senderName, x.id);
        }}
      />

      <FaX
        className="mt-1.5 ml-1 text-[#dc2626]"
        onClick={() => {
          reject(x.id);
        }}
      />
    </div>
  ));

  return (
    <div>
      <ul>{listOfRequests}</ul>
    </div>
  );
}

export default Chat_FriendRequests;
