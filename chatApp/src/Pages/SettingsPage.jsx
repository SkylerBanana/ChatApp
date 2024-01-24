import { getAuth } from "firebase/auth";
import { FaPencil } from "react-icons/fa6";
import { useState } from "react";

export default function SettingsPage() {
  const [shown, setShown] = useState(false);

  const auth = getAuth();

  return (
    <div className="bg-[#2e3034] min-h-screen">
      <div className="flex items-center justify-center pt-4">
        {shown && (
          <div className="absolute text-white">
            <FaPencil />
          </div>
        )}
        <img
          onMouseEnter={() => {
            setShown(true);
          }}
          onMouseLeave={() => {
            setShown(false);
          }}
          className={`w-20 h-20 mr-2 ${shown ? "opacity-50" : "a"}`}
          src="https://cdn.discordapp.com/attachments/1092285231689646112/1194653934585917560/Default_pfp.svg.png?ex=65b1232d&is=659eae2d&hm=797ab873a71590a7577ac85cd4d7f718528b18102c9268f8ec7a5f43702e5186&"
        />
      </div>
      <h1 className="text-center text-white text-4xl">
        {auth.currentUser.displayName}
      </h1>
      <p className="text-center text-gray-500">{auth.currentUser.email}</p>
    </div>
  );
}
