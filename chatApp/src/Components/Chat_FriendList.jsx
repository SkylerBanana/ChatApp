import { useEffect, useState } from "react";
import { getDatabase, ref, get, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";

function FriendList() {
  const [friends, setFriends] = useState([]);
  const Database = getDatabase();
  const Auth = getAuth();
  useEffect(() => {
    if (!Auth.currentUser) {
      return;
    }

    const friendslistref = ref(
      Database,
      `/users/${Auth.currentUser.uid}/friends/`
    );
    const friendsListener = onValue(friendslistref, async (snapshot) => {
      if (snapshot.exists()) {
        const friendsData = snapshot.val();
        const friendsArray = Object.keys(friendsData);

        const newFriendsArray = await Promise.all(
          friendsArray.map(async (property) => {
            const userName = await friendsData[property].username;

            return {
              id: property,
              username: userName,
            };
          })
        );

        setFriends(() => [...newFriendsArray]);
      }
    });

    return () => {
      friendsListener();
    };
  }, []);

  function check() {
    console.log(friends);
  }
  return (
    <div className="fixed text-white pl-2 ml-12 mt-12">
      <p className="text-center">Friends List:</p>
      {friends.map((friend) => (
        <div key={friend.id}>
          <p>{friend.username}</p>
        </div>
      ))}
    </div>
  );
}

export default FriendList;
