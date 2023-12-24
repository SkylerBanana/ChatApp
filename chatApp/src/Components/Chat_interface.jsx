import Chat_input from "./Chat_input";
import Chat_nav from "./Chat_Nav";
import Chat_background from "./Chat_background";
import Chat_Addfriend from "./Chat_Addfriend";

function Chat_interface() {
  return (
    <div>
      <Chat_nav />
      <Chat_Addfriend />
      <Chat_input />
      <Chat_background />
    </div>
  );
}

export default Chat_interface;
