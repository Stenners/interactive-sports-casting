import './chatBtn.modules.css'

function handleClick() {
  console.log('sup');
}

function ChatButton() {
  return (
    <button className="chatBtn" onClick={handleClick}>Chat!</button>
  );
}

export default ChatButton;
