import { io } from "socket.io-client";
import { generateColor } from '../../utils/colorgen';
import { generateName } from "../../utils/namegen";
import { useEffect, useRef, useState } from "react";
import "./chat.modules.css";
import { AvatarGenerator } from '../avatar';

const socket = io("https://rocky-plateau-75193.herokuapp.com/");
const generator = new AvatarGenerator();

function Chat() {
  const bottomRef = useRef(null);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("anth");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const name = generateName();
    setName(name);
    console.log(name);
  }, []);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    const messages = bottomRef.current;
    messages.scrollTop = messages.scrollHeight;
    console.log(messages.scrollHeight);
  }, [messages, message]);

  socket.on("chat message", function (msg) {
    const messagesArr = [...messages];
    messagesArr.push({...msg, avatar: generator.generateRandomAvatar(msg.name)});
    setMessages(messagesArr);
  });

  socket.on("history", function (history) {
    const msgHistory = history.map(item => ({
      ...item,
      avatar: generator.generateRandomAvatar(item.name),
      bgColor: generateColor(),
    }))
    setMessages(msgHistory);
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("chat message", {
        message: message,
        name,
        avatar: generator.generateRandomAvatar(name),
        bgColor: generateColor()
      });
      setMessage("");
    }
  };

  return (
    <div className="chatWrap">
      <div id="messages" ref={bottomRef} className="messages">
        {messages.map((msg) => (
          <div key={msg.message} className="messageWrap">
            <img src={msg.avatar} alt="avatar" className="avatar" style={{backgroundColor: msg.bgColor}} />
            <span>
              {`${msg.name}: ${msg.message}`}
            </span>
          </div>
        ))}
      </div>
      <form id="form" action="" onSubmit={handleSubmit}>
        <input
          type="text"
          id="message"
          name="message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        {/* <button>Send</button> */}
      </form>
    </div>
  );
}

export default Chat;
