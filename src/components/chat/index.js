import { io } from "socket.io-client";
import { generateColor } from '../../utils/colorgen';
import { generateName } from "../../utils/namegen";
import { useEffect, useRef, useState } from "react";
import "./chat.modules.css";
import { AvatarGenerator } from '../avatar';

const socket = io("https://rocky-plateau-75193.herokuapp.com/");
const generator = new AvatarGenerator();
const avatarBg = generateColor();

function Chat() {
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("anth");
  const [messages, setMessages] = useState([]);
  const [offSet, setOffSet] = useState(-8);

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
      bgColor: item.bgColor,
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
        bgColor: avatarBg,
      });
      setMessage("");
    }

    setOffSet(-8);
  };

  const handleFocus = () => {
    setOffSet(-42);
  };

  const handleKeyUp = (e) => {
    if (e.code === "Enter" || e.keyCode === 13) {
      inputRef.current.blur();
      bottomRef.current.focus();
    }
  };

  return (
    <div className="chatWrap" style={{transform: `translateY(${offSet}px)`}}>
      <div id="messages" ref={bottomRef} className="messages">
        {messages.map((msg) => (
          <div key={msg.message} className="messageWrap">
            <img src={msg.avatar} alt="avatar" className="avatar" style={{backgroundColor: msg.bgColor}} />
            <span className="name">{msg.name}</span>: {msg.message}
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
          onFocus={handleFocus}
          onKeyUp={handleKeyUp}
          ref={inputRef}
        />
        {/* <button>Send</button> */}
      </form>
    </div>
  );
}

export default Chat;
