import { ReactMenuInfoType } from "../lib/types";
import { socket } from "../socket";
import { reacts } from "../utils/reacts";

type ReactsMenuPropsType = {
  setViewReactMenu: React.Dispatch<React.SetStateAction<boolean>>;
  reactMenuInfo: ReactMenuInfoType | undefined;
};

export default function ReactsMenu({
  reactMenuInfo,
  setViewReactMenu,
}: ReactsMenuPropsType) {
  function sendReact(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const index = e.currentTarget.getAttribute("data-index");
    socket.emit("sendReact", {
      react: index,
      messageId: reactMenuInfo?.messageId,
    });
    setViewReactMenu(false);
  }
  return (
    <div
      className="absolute top-0 left-0 w-full h-full"
      onClick={() => setViewReactMenu(false)}
    >
      <div
        style={{
          top: `${reactMenuInfo?.positionY}px`,
          left: `${reactMenuInfo?.positionX}px`,
        }}
        className={`absolute -translate-y-16 flex gap-2 bg-gray-700 rounded-lg w-fit p-2 `}
        onClick={(e) => e.stopPropagation()}
      >
        {reacts.map((react, index) => (
          <button key={index} data-index={index} onClick={(e) => sendReact(e)}>
            <img className="size-4" src={react} alt="react" />
          </button>
        ))}
      </div>
    </div>
  );
}
