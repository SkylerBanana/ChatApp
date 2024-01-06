import SignInPage from "./Components/SignInPage";
import RegistrationPage from "./Components/RegistrationPage";
import Background from "./Components/Background";
import Chat_interface from "./Components/Chat_interface";
import Chat_FriendList from "./Components/Chat_FriendList";
import Chat_FriendRequests from "./Components/Chat_FriendRequests";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Chat_interface />}>
          <Route path="FriendList" element={<Chat_FriendList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
