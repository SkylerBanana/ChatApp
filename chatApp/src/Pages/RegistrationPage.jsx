import Input_email from "../Components/Input_email";
import Input_password from "../Components/Input_password";
import Background from "../Components/Background";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getDatabase, ref, push, set } from "firebase/database";

import { useState, useEffect } from "react";
import Input_userName from "../Components/Input_userName";
import { Link } from "react-router-dom";

//Initialize Database

function RegistrationPage() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [inputusername, setInputusername] = useState("");

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleChangeUserName = (event) => {
    setInputusername(event.target.value);
  };

  function Submit() {
    const auth = getAuth();
    const Database = getDatabase();
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        updateProfile(user, { displayName: inputusername }).then(() => {
          console.log(user);
          const Databaseref = ref(Database, "/users/" + user.uid);
          set(Databaseref, {
            username: inputusername,
          });
        });
      })
      .catch(console.error)
      .finally(() => {
        setLoading(false);
        setAuthenticating(false);
      });
  }

  return (
    <div>
      <Background />
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="space-y-6" action="#">
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

          <Input_password Change={handleChangePassword} />

          <button
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={Submit}
          >
            Continue
          </button>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            {" "}
            <a
              href="#"
              className="text-blue-700 hover:underline dark:text-blue-500"
            >
              <Link to="/login">Already have an account?</Link>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationPage;
