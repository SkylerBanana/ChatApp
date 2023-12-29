import Chat_Addfriend from "./Chat_Addfriend";
import { useState } from "react";
import {
  getDatabase,
  ref,
  set,
  update,
  get,
  runTransaction,
} from "firebase/database";
import { getAuth } from "firebase/auth";

function FriendList() {
  return (
    <div>
      <Chat_Addfriend />
    </div>
  );
}

export default FriendList;
