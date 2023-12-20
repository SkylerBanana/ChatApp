import "./Component Styles/SignInPageStyles.css";
function SignInPage() {
  return (
    <div className="potato bg-blue-900 h-dvh">
      <div className="SignInPage-Div absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid gap-2 shadow">
        <h1 className="text-center">Welcome!</h1>
        <h2 className="text-center">We're so excited to see you!</h2>
        <div className="SignIn-Form">
          <form>
            <h3>EMAIL</h3>
            <input type="email" name="query" />
            <h3>PASSWORD</h3>
            <input type="password" name="" />
          </form>
          <button type="submit" className="gap-6">
            Submit
          </button>
          <p className="">Forgot your password?</p>
          <p>Register an account</p>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
