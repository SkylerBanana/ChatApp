import Background from "../Components/Background";
import Input_email from "../Components/Input_email";
import Input_password from "../Components/Input_password";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";
function SignInPage() {
  const auth = getAuth();
  const Navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Navigate("/");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Login error:", errorCode, errorMessage);
    }
  };
  return (
    <div>
      <Background />
      <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <form class="space-y-6" action="#">
          <h5 class="text-xl font-medium text-gray-900 dark:text-white text text-center">
            Sign in to our platform
          </h5>
          <div>
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <Input_email Change={handleChangeEmail} />
          </div>

          <Input_password Change={handleChangePassword} />

          <div class="flex items-start">
            <a
              href="#"
              class=" text-sm text-blue-700 hover:underline dark:text-blue-500"
            >
              Lost Password?
            </a>
          </div>
          <button
            onClick={handleSignIn}
            class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login to your account
          </button>
          <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered?{" "}
            <a
              href="#"
              class="text-blue-700 hover:underline dark:text-blue-500"
            >
              <Link to="/register">Create account</Link>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignInPage;
