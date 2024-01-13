import Chat_input from "./Chat_input";
import Chat_nav from "./Chat_Nav";
import Chat_background from "./Chat_background";
import Chat_Addfriend from "./Chat_Addfriend";
import Chat_MainRoom from "./Chat_GlobalRoom";

import Chat_FriendList from "./Chat_FriendList";
import Friend from "./Chat_Friend";

function Chat_interface() {
  return (
    <div className="bg-[#2e3034] bg-cover h-dvh flex ">
      <Chat_nav />
      <Friend />
    </div>
  );
}

export default Chat_interface;
