import Chat_Addfriend from "./Chat_Addfriend";

import Chat_FriendRequests from "./Chat_FriendRequests";

import Chat_FriendList from "./Chat_FriendList";

import { useState } from "react";

export default function Chat_Friend() {
  const [renderState, setrenderState] = useState(false);
  return (
    <div className="bg-[#25292f]">
      <Chat_Addfriend />
      <div>
        <div className="flex  justify-center mt-3 mb-3">
          <button
            onClick={() => setrenderState(false)}
            type="button"
            className="ml-2 mr-2 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Friends
          </button>
          <button
            onClick={() => setrenderState(true)}
            type="button"
            className="ml-2 mr-2 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Pending
          </button>
        </div>
        {renderState ? <Chat_FriendRequests /> : <Chat_FriendList />}
      </div>
    </div>
  );
}
