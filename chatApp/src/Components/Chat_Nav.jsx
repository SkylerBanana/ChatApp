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
        <div className="" onClick={() => props.callBack(false)}>
          <div className="text-white text-5xl hover:bg-gray-700 p-2 rounded">
            <IoChatbubbleEllipsesOutline />
          </div>
        </div>

        <div className="" onClick={props.toggleFriend}>
          <div className="text-white text-5xl hover:bg-gray-700 p-2 rounded">
            <IoPeople />
          </div>
        </div>

        <div className="" onClick={() => Navigate("/SettingsPage")}>
          <div className="text-white text-5xl hover:bg-gray-700 p-2 rounded">
            <IoSettingsSharp />
          </div>
        </div>

        <div
          className=" mt-auto"
          onClick={() => {
            const currentUserRef = ref(
              Database,
              `/users/${Auth.currentUser.uid}`
            );
            update(currentUserRef, { userStatus: "offline" });
            signOut(Auth)
              .then(() => {
                console.log("Sign Out Successful");
              })
              .catch((error) => {
                console.log("error");
              });
          }}
        >
          <div className="text-white text-5xl hover:bg-gray-700 p-2 rounded">
            <IoLogOutOutline />
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Chat_nav;
