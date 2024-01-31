import { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";

function FriendList(props) {
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

  function handleClick(friendID) {
    props.grabID(friendID);
    props.callBack1(true);
  }

  return (
    <div className=" text-white ">
      {friends.map((friend) => (
        <div
          key={friend.id}
          onClick={() => {
            handleClick(friend.id);
          }}
          className=""
        >
          <p className="border-2 text-center">{friend.username}</p>
        </div>
      ))}
    </div>
  );
}

export default FriendList;
