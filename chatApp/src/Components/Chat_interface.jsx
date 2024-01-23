import React, { useState, useEffect } from "react";

import Chat_nav from "./Chat_Nav";

import Chat_MainRoom from "./Chat_GlobalRoom";

import Chat_Users from "./Chat_Users";

import Friend from "./Chat_Friend";

import Chat_UsersMobile from "./Chat_UsersMobile";

function Chat_interface() {
  const [toggle, setToggle] = useState(false);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const mobileBreakpoint = 768;

  function FriendToggle() {
    setToggle(!toggle);
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

  return (
    <div className="flex  bg-[#2e3034] bg-cover">
      <Chat_nav toggleFriend={FriendToggle} />
      {toggle && <Friend />}
      <Chat_MainRoom />
      {!isMobile && <Chat_Users />}
      {isMobile && <Chat_UsersMobile />}
    </div>
  );
}

export default Chat_interface;
