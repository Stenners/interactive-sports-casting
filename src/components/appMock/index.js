import "./appMock.modules.css";
import ChatButton from "../chatButton";
import groupPage from './group-page.jpg'

function ListnrMock() {
  return (
    <div className="mock">
      <ChatButton />
      <div className="playerWrap">
        <img className="player" src={groupPage} alt="player" />
      </div>
    </div>
  );
}

export default ListnrMock;
