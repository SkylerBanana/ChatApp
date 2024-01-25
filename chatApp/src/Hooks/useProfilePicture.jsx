import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const useProfilePicture = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const auth = getAuth();
  const storage = getStorage();

  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        const profilePictureRef = ref(
          storage,
          `images/${auth.currentUser.uid}`
        );
        const profilePictureUrl = await getDownloadURL(profilePictureRef);
        setProfilePicture(profilePictureUrl);
      } catch (error) {
        const defaultImageRef = ref(storage, "default/default_image.png");
        const defaultImageUrl = await getDownloadURL(defaultImageRef);
        setProfilePicture(defaultImageUrl);
      }
    };

    if (auth.currentUser) {
      fetchProfilePicture();
    }
  }, [auth.currentUser, storage]);

  return profilePicture;
};

export default useProfilePicture;
