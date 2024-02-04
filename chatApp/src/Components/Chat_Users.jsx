import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import UserAvatar from "./UserAvatar";

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
        });
      }
    });
  }, []);
  useEffect(() => {}, [onlineUsers]);

  return (
    <>
      <div className="text-center text-white w-1/12 overscroll-none">
        <div>
          <u>Online</u>
          {onlineUsers.map((onlineUser) => (
            <div className="flex items-center mb-4" key={onlineUser.id}>
              <div className="relative">
                <UserAvatar id={onlineUser.id} />
                <div className="border-2 border-solid border-black absolute bg-green-600 w-3 h-3 rounded-full bottom-1 right-0 left-6 "></div>
              </div>
              <p>{onlineUser.username}</p>
            </div>
          ))}
        </div>
        <div>
          <u>Offline</u>
          {offlineUsers.map((offlineUser) => (
            <div className="flex items-center mb-4" key={offlineUser.id}>
              <div className="relative">
                <UserAvatar id={offlineUser.id} />
                <div className="border-2 border-solid border-black absolute bg-slate-400 w-3 h-3 rounded-full bottom-1 right-0 left-6 "></div>
              </div>
              <p>{offlineUser.username}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
