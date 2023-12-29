import {
  getDatabase,
  ref,
  set,
  update,
  get,
  runTransaction,
} from "firebase/database";
import { getAuth } from "firebase/auth";
import { useState, useEffect } from "react";

function Chat_Addfriend() {
  async function friendAdd(auth, friendid) {
    const Database = getDatabase();
    const currentUserUid = auth.currentUser.uid;

    const updateFriendRequest = async (
      userId,
      newFriendArray,
      sent_Received
    ) => {
      await runTransaction(ref(Database, `/users/${userId}`), (currentData) => {
        let OBJ = {};
        OBJ[sent_Received] = newFriendArray;
        console.log(currentData.username);
        if (!currentData["friendRequest"] || currentData == null) {
          return {
            ...currentData,
            friendRequest: [OBJ],
          };
        } else {
          //  const { friendRequest, ...dataWithoutfriendrequest } = currentData;
          return {
            ...currentData,
            friendRequest: [...currentData.friendRequest, OBJ],
          };
        }
      });
    };

    await updateFriendRequest(currentUserUid, friendid, "sender");

    await updateFriendRequest(friendid, currentUserUid, "receiver");

    console.log("Friend request added successfully");
  }
  const [friend, setFriend] = useState("");

  function changeFriend(event) {
    setFriend(event.target.value);
    console.log(friend);
  }

  function Check() {
    const Database = ref(getDatabase());
    const auth = getAuth();

    get(Database)
      .then((snapshot) => {
        if (snapshot.exists()) {
          let data = snapshot.val().users;

          for (const [key, value] of Object.entries(data)) {
            if (value.username === friend) {
              console.log(value.friendRequest);
              friendAdd(auth, key);
            } else {
              console.log("That's not a user");
            }
          }
        } else {
          console.log("No Data");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="flex items-center w-1/4 absolute ml-12">
      <label for="simple-search" className="sr-only">
        Search
      </label>
      <div className="relative w-1/2">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
            />
          </svg>
        </div>
        <input
          onChange={changeFriend}
          type="text"
          id="simple-search"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search for a friend"
          required
        />
      </div>
      <button
        onClick={Check}
        className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <svg
          className="w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
        <span className="sr-only">Search</span>
      </button>
    </div>
  );
}

export default Chat_Addfriend;
