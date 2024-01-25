import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { FaPencil } from "react-icons/fa6";
import { useState, useEffect } from "react";
import useProfilePicture from "../Hooks/useProfilePicture";
export default function SettingsPage() {
  const [shown, setShown] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const auth = getAuth();
  const storage = getStorage();
  const onlineUser = auth.currentUser.uid;
  const profilePicture = useProfilePicture(onlineUser);

  const uploadImage = async (file) => {
    if (file) {
      const storageRef = ref(storage, `images/${auth.currentUser.uid}`);
      await uploadBytes(storageRef, file);
    }
  };

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
          onClick={() => document.getElementById("fileInput").click()}
          className={`w-20 h-20 rounded-full  ${shown ? "opacity-50" : "a"}`}
          src={
            selectedImage ? URL.createObjectURL(selectedImage) : profilePicture
          }
        />
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(event) => {
            const selectedFile = event.target.files[0];
            setSelectedImage(selectedFile);
            uploadImage(selectedFile);
          }}
        />
      </div>
      <h1 className="text-center text-white text-4xl">
        {auth.currentUser.displayName}
      </h1>
      <p className="text-center text-gray-500">{auth.currentUser.email}</p>
    </div>
  );
}
