import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import useProfilePicture from "../Hooks/useProfilePicture";

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
      <div className="text-center text-white w-1/12 overscroll-none">
        <div>
          <u>Online</u>
          {onlineUsers.map((onlineUser) => (
            <div className="flex items-center mb-2" key={onlineUser.id}>
              <div className="relative">
                <img
                  className="w-10 h-10 mr-2 rounded-full"
                  src={useProfilePicture(onlineUser)}
                />
                <div className="border-2 border-solid border-black absolute bg-green-600 w-3 h-3 rounded-full bottom-1 right-0 left-6 "></div>
              </div>
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
