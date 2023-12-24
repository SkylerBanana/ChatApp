import {
  IoPeople,
  IoChatbubbleEllipsesOutline,
  IoSettingsSharp,
  IoLogOutOutline,
} from "react-icons/io5";
function Chat_nav() {
  return (
    <nav className="bg-[#17191d] h-dvh fixed w-1/8 rounded flex flex-col justify-between">
      <ul>
        <li className="text-white text-5xl">
          <IoChatbubbleEllipsesOutline />
        </li>
        <li className="text-white text-5xl">
          <IoPeople />
        </li>
        <li className="text-white text-5xl">
          <IoSettingsSharp />
        </li>
      </ul>
      <div className="text-white text-5xl mb-3">
        <IoLogOutOutline />
      </div>
    </nav>
  );
}

export default Chat_nav;
