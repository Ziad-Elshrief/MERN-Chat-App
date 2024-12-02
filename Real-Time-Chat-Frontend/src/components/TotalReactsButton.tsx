import { MessageReactType, MessageType } from "../lib/types";
import { socket } from "../socket";
import { reacts } from "../utils/reacts";

type TotalReactsButtonPropsType = {
  Message: MessageType;
  MessageIndex: number;
  setViewReactsList: React.Dispatch<React.SetStateAction<number>>;
};

export default function TotalReactsButton({
  Message,
  MessageIndex,
  setViewReactsList,
}: TotalReactsButtonPropsType) {
  function generateReacts(MsgReactsList: MessageReactType[]) {
    const reactsCount = new Array(reacts.length).fill(0);
    MsgReactsList.forEach((reactObject) => reactsCount[reactObject.react]++);
    return (
      <>
        {reacts.map(
          (react, index) =>
            reactsCount[index] > 0 && (
              <>
                <img src={react} alt="react" className="size-3 mr-0.5" />{" "}
                <span className="mr-1.5">{reactsCount[index]}</span>
              </>
            )
        )}
      </>
    );
  }
  return (
    <button
      className={`absolute  ${
        Message.userId === socket.id ? "right-11" : "left-11"
      } bottom-0 translate-y-1/2 p-1 rounded-2xl bg-gray-500 text-white text-sm font-semibold flex items-center`}
      data-index={MessageIndex}
      onClick={(e) =>
        setViewReactsList(Number(e.currentTarget.getAttribute("data-index")))
      }
    >
      {generateReacts(Message.reactsList)}
    </button>
  );
}
