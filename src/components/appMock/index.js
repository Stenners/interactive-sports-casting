import "./appMock.modules.css";
import ChatButton from "../chatButton";
import screen1 from './group-page.jpg'

function ListnrMock() {
  return (
    <div className="mock">
      <ChatButton />
      <div className="playerWrap">
        <img className="player" src={screen1} alt="player" />
      </div>
    </div>
  );
}

export default ListnrMock;
