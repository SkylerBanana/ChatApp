import {
  IoPeople,
  IoChatbubbleEllipsesOutline,
  IoSettingsSharp,
  IoLogOutOutline,
} from "react-icons/io5";

import { signOut, getAuth } from "firebase/auth";
import { Outlet, Link } from "react-router-dom";

function Chat_nav(props) {
  const Auth = getAuth();
  return (
    <div className="w-fit z-10">
      <nav className="bg-[#17191d] h-dvh rounded flex flex-col justify-between">
        <ul>
          <li className="text-white text-5xl">
            <IoChatbubbleEllipsesOutline />
          </li>

          <li className="text-white text-5xl">
            <IoPeople onClick={props.toggleFriend} />
          </li>

          <li className="text-white text-5xl">
            <IoSettingsSharp />
          </li>
        </ul>
        <div
          onClick={() => {
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
