import React, { useState, useEffect } from "react";

import Chat_nav from "./Chat_Nav";

import Chat_MainRoom from "./Chat_GlobalRoom";

import Chat_Users from "./Chat_Users";

import Friend from "./Chat_Friend";

import Chat_UsersMobile from "./Chat_UsersMobile";
import Chat_PrivateRoom from "./Chat_PrivateRoom";

function Chat_interface() {
  const [toggle, setToggle] = useState(false);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const [friendID, setFriendID] = useState(null);

  const [chatSelection, setChatSelection] = useState(false);

  const mobileBreakpoint = 768;

  function FriendToggle() {
    setToggle(!toggle);
  }

  function selectChat(value) {
    setChatSelection(value);
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [mobileBreakpoint]);

  function handleIdChange(newID) {
    setFriendID(newID);
  }

  return (
    <div className="flex  bg-[#2e3034] bg-cover">
      <Chat_nav toggleFriend={FriendToggle} callBack={selectChat} />
      {toggle && <Friend grabID={handleIdChange} callBack1={selectChat} />}
      {!chatSelection ? <Chat_MainRoom /> : <Chat_PrivateRoom id={friendID} />}
      {!isMobile && <Chat_Users />}
      {isMobile && <Chat_UsersMobile />}
    </div>
  );
}

export default Chat_interface;
