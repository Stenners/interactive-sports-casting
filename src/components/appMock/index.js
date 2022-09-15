import "./appMock.modules.css";
import ChatButton from "../chatButton";
import player from './player-nrl.jpg'

function ListnrMock() {
  return (
    <div className="mock">
      <ChatButton />
      <div className="playerWrap">
        <img className="player" src={player} alt="player" />
      </div>
    </div>
  );
}

export default ListnrMock;
