import "./chatBtn.modules.css";

function ChatButton({ click }) {
  return (
    <button className="chatBtn" onClick={click}>
      Chat!
    </button>
  );
}

export default ChatButton;
