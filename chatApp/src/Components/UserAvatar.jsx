import useProfilePicture from "../Hooks/useProfilePicture";
export default function UserAvatar(props) {
  const profilePicture = useProfilePicture(props.id);

  return <img className="w-10 h-10 mr-2 rounded-full" src={profilePicture} />;
}
