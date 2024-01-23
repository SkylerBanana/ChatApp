import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";

export default function Chat_Users() {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [offlineUsers, setOfflineUsers] = useState([]);

  const Database = getDatabase();
  const auth = getAuth();
  const currentUserUid = auth.currentUser.uid;

  useEffect(() => {
    if (!currentUserUid) {
      return;
    }

    const usersRef = ref(Database, `/users/`);

    onValue(usersRef, (snapshot) => {
      if (snapshot.exists()) {
        const users = snapshot.val();
        const requestKeys = Object.keys(users);

        const newUsers = Promise.all(
          requestKeys.map(async (property) => {
            return {
              id: property,
              username: users[property].username,
              status: users[property].userStatus,
            };
          })
        );

        newUsers.then((userInfo) => {
          const online = userInfo.filter((user) => user.status === "online");
          const offline = userInfo.filter((user) => user.status === "offline");

          setOnlineUsers(online);
          setOfflineUsers(offline);
          console.log(onlineUsers);
        });
      }
    });
  }, []);
  useEffect(() => {
    console.log("Online Users:", onlineUsers);
  }, [onlineUsers]);

  return (
    <>
      <div className="text-center text-white  overscroll-none bg-black w-screen h-screen">
        <div>
          <u>Online</u>
          {onlineUsers.map((onlineUser) => (
            <div key={onlineUser.id}>
              <p>{onlineUser.username}</p>
            </div>
          ))}
        </div>
        <div>
          <u>Offline</u>
          {offlineUsers.map((offlineUser) => (
            <div key={offlineUser.id}>
              <p>{offlineUser.username}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
