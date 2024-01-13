import SignInPage from "./Pages/SignInPage";
import RegistrationPage from "./Pages/RegistrationPage";
import Background from "./Components/Background";
import Chat_interface from "./Components/Chat_interface";
import Chat_FriendList from "./Components/Chat_FriendList";
import Chat_FriendRequests from "./Components/Chat_FriendRequests";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAgJXs3Gd-Bqr1Q88xpXlFqDnYznZFp-ro",
  authDomain: "chat-app-8b834.firebaseapp.com",
  projectId: "chat-app-8b834",
  storageBucket: "chat-app-8b834.appspot.com",
  messagingSenderId: "519487462956",
  appId: "1:519487462956:web:6593f3647a8ad81581bb89",
  measurementId: "G-4Q4CYL4JPM",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
  const auth = getAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  const ProtectedRoute = ({ children }) => {
    if (!auth.currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route
              index
              element={
                <ProtectedRoute>
                  <Chat_interface />
                </ProtectedRoute>
              }
            />
            <Route path="login" element={<SignInPage />} />
            <Route path="register" element={<RegistrationPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
