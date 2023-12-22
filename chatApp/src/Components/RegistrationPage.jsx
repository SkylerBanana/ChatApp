import Input_email from "./Input_email";
import Input_password from "./Input_password";
import Background from "./Background";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { useState, useEffect } from "react";
import Input_userName from "./Input_userName";

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgJXs3Gd-Bqr1Q88xpXlFqDnYznZFp-ro",
  authDomain: "chat-app-8b834.firebaseapp.com",
  projectId: "chat-app-8b834",
  storageBucket: "chat-app-8b834.appspot.com",
  messagingSenderId: "519487462956",
  appId: "1:519487462956:web:6593f3647a8ad81581bb89",
  measurementId: "G-4Q4CYL4JPM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function Submit() {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then(({ user }) => {
      updateProfile(user, { displayName: username });
    })
    .catch(console.log)
    .finally(() => {
      setLoading(false);
      setAuthenticating(false);
    });
}

function RegistrationPage() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [username, setUsername] = useState("");

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  console.log(email);
  console.log(password);
  console.log(username);

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleChangeUserName = (event) => {
    setUsername(event.target.value);
  };

  return (
    <div>
      <Background />
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <form className="space-y-6" action="#" onSubmit={Submit}>
          <h5 className="text-xl font-medium text-gray-900 dark:text-white text text-center">
            Create an account
          </h5>
          <div>
            <label
              for="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <Input_email Change={handleChangeEmail} />
          </div>

          <div>
            <label
              for="username"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Username
            </label>
            <Input_userName Change={handleChangeUserName} />
          </div>
          <div>
            <label
              for="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <Input_password Change={handleChangePassword} />
          </div>

          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Continue
          </button>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            {" "}
            <a
              href="#"
              className="text-blue-700 hover:underline dark:text-blue-500"
            >
              Already have an account?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegistrationPage;
