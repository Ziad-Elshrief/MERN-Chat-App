import { useNavigate } from "react-router-dom";
import { socket } from "../socket";
import { useJoined } from "../context/JoinedContext";

type leaveMenuProps = {
  setWillLeave: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function LeaveMenu({ setWillLeave }: leaveMenuProps) {
  const navigate = useNavigate();
   const { setJoined } = useJoined();
  function leaveRoom() {
    setJoined(false);
    socket.disconnect();
    navigate("/join-chat");
  }
  return (
    <div
      className="absolute top-0 left-0 w-screen z-50 h-dvh bg-slate-800 bg-opacity-90 flex justify-center items-center"
      onClick={() => setWillLeave(false)}
    >
      <div
        className=" text-white shadow-md rounded-xl overflow-hidden m-5"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="text-center p-5 bg-indigo-700 ">
          <h1 className="text-lg">Are you sure you want to leave?</h1>
        </header>
        <main className="p-5 bg-indigo-500 flex justify-center items-center gap-5">
          <button
            type="button"
            className=" bg-indigo-900 p-2 rounded-lg hover:bg-indigo-700"
            onClick={() => leaveRoom()}
          >
            Leave
          </button>
          <button
            type="button"
            className=" bg-indigo-900 p-2 rounded-lg hover:bg-indigo-700"
            onClick={() => setWillLeave(false)}
          >
            Cancel
          </button>
        </main>
      </div>
    </div>
  );
}
