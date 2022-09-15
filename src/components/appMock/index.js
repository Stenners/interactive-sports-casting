import { useState } from "react";
import ChatButton from "../chatButton";
import groupPage from "./group-page.jpg";
import Overlay from "../overlay";
import "./appMock.modules.css";

function ListnrMock() {
  const [overlay, setOverlay] = useState(false);

  function handleClick() {
    setOverlay(!overlay);
  }

  return (
    <div className="mock">
      <Overlay show={overlay} click={handleClick} />
      <ChatButton click={handleClick} />
      <div className="playerWrap">
        <img className="player" src={groupPage} alt="player" />
      </div>
    </div>
  );
}

export default ListnrMock;
