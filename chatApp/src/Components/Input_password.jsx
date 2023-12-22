function Input_password(props) {
  return (
    <input
      type="password"
      name="password"
      id="password"
      placeholder="••••••••"
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
      required
      onChange={props.Change}
    />
  );
}

export default Input_password;
