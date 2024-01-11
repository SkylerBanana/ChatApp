import "./Component Styles/Chat_inputStyles.css";

function Chat_input(props) {
  return (
    <footer className="fixed bottom-0 right-25 pl-5 pr-5 z-10 w-3/4">
      <div className="mb-4 z-10">
        <input
          type="text"
          onChange={props.onChange}
          onKeyDown={props.onKeyPress}
          value={props.value}
          id="default-input"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 z-10 "
        />
      </div>
    </footer>
  );
}

export default Chat_input;
