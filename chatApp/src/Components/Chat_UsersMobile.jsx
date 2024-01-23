import { useNavigate } from "react-router-dom";

export default function Chat_UsersMobile() {
  const Navigate = useNavigate();

  return (
    <div
      onClick={() => {
        Navigate("/usersmobile");
      }}
      className="fixed w-full  left-1/2 transform -translate-x-1/2  z-10 align-center text-white bg-[#17191d] text-center"
    >
      <p>GLOBAL CHAT</p>
    </div>
  );
}
