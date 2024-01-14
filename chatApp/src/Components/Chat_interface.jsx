import Chat_nav from "./Chat_Nav";

import Chat_MainRoom from "./Chat_GlobalRoom";

import Friend from "./Chat_Friend";
import { useState } from "react";
function Chat_interface() {
  const [toggle, setToggle] = useState(false);
  function FriendToggle() {
    setToggle(!toggle);
  }

  return (
    <div className="flex  bg-[#2e3034] bg-cover">
      <Chat_nav toggleFriend={FriendToggle} />
      {toggle && <Friend />}
      <Chat_MainRoom />
    </div>
  );
}

export default Chat_interface;
