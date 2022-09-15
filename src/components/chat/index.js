import { io } from "socket.io-client";
import { useState } from "react";
import "./chat.modules.css";

const socket = io("https://rocky-plateau-75193.herokuapp.com/");

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  // useEffect(() => {
  //   console.log("conneting");
  // }, []);

  socket.on("chat message", function (msg) {
    console.log(msg);
    const messagesArr = [...messages];
    messagesArr.push(msg);
    setMessages(messagesArr);
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("chat message", message);
      setMessage("");
    }
  };

  return (
    <div className="chatWrap">
      <ul id="messages">
        {messages.map((msg) => (
          <li>{msg}</li>
        ))}
      </ul>
      <form id="form" action="" onSubmit={handleSubmit}>
        <input
          type="text"
          id="message"
          name="message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <button>Send</button>
      </form>
    </div>
  );
}

export default Chat;
