import {
  IoPeople,
  IoChatbubbleEllipsesOutline,
  IoSettingsSharp,
  IoLogOutOutline,
} from "react-icons/io5";

import { signOut, getAuth } from "firebase/auth";
import { Outlet, Link } from "react-router-dom";
function Chat_nav() {
  const Auth = getAuth();
  return (
    <div>
      <nav className="bg-[#17191d] h-dvh fixed w-1/8 rounded flex flex-col justify-between">
        <ul>
          <li className="text-white text-5xl">
            <IoChatbubbleEllipsesOutline />
          </li>
          <Link to="/FriendList">
            <li className="text-white text-5xl">
              <IoPeople />
            </li>
          </Link>
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
      <Outlet />
    </div>
  );
}

export default Chat_nav;
