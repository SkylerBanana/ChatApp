import "./Component Styles/Chat_inputStyles.css";

function Chat_input() {
  return (
    <footer className="fixed bottom-0 right-0 mr-8 w-4/5">
      <div className="mb-4 ">
        <input
          type="text"
          id="default-input"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
    </footer>
  );
}

export default Chat_input;
