import Chat from "../chat";
import Stream from "../stream";
import { BsFillArrowDownCircleFill } from "react-icons/bs";
import "./overlay.modules.css";

function Overlay({ show, click }) {
  const overlayHidden = show ? '': 'hidden';
  return (
    <div className={`overlay ${overlayHidden}`}>
      <BsFillArrowDownCircleFill color="white" size="2em" onClick={click} />
      <Stream />
      <Chat />
    </div>
  );
}

export default Overlay;
