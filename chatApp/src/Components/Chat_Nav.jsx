import {
  IoPeople,
  IoChatbubbleEllipsesOutline,
  IoSettingsSharp,
  IoLogOutOutline,
} from "react-icons/io5";

import { getDatabase, ref, update } from "firebase/database";

import { signOut, getAuth } from "firebase/auth";

import { useNavigate } from "react-router-dom";

function Chat_nav(props) {
  const Navigate = useNavigate();

  const Database = getDatabase();

  const Auth = getAuth();

  return (
    <div className="w-fit z-20">
      <nav className="bg-[#17191d] h-dvh rounded flex flex-col justify-between">
        <ul>
          <li className="text-white text-5xl">
            <IoChatbubbleEllipsesOutline
              onClick={() => {
                props.callBack(false);
              }}
            />
          </li>

          <li className="text-white text-5xl">
            <IoPeople onClick={props.toggleFriend} />
          </li>

          <li className="text-white text-5xl">
            <IoSettingsSharp
              onClick={() => {
                Navigate("/SettingsPage");
              }}
            />
          </li>
        </ul>
        <div
          onClick={() => {
            const currentUserRef = ref(
              Database,
              `/users/${Auth.currentUser.uid}`
            );

            update(currentUserRef, { userStatus: "offline" });
            signOut(Auth)
              .then(() => {
                console.log("Sign Out Successful ");
              })
              .catch((error) => {
                console.log("error");
              });
          }}
          className="text-white text-5xl mb-3"
        >
          <IoLogOutOutline />
        </div>
      </nav>
    </div>
  );
}

export default Chat_nav;
