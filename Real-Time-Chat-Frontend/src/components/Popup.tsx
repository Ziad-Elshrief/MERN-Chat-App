import { MouseEventHandler } from "react";

type PopupProps = {
  popupHeader: string;
  confirmText: string;
  cancelText: string;
  confirmOnClick: MouseEventHandler<HTMLButtonElement> | undefined;
  cancelOnClick: MouseEventHandler<HTMLElement> | undefined;
};

export default function Popup({
  popupHeader,
  confirmText,
  cancelText,
  confirmOnClick,
  cancelOnClick,
}: PopupProps) {
  return (
    <div
      className="absolute top-0 left-0 w-screen z-50 h-dvh bg-slate-800 bg-opacity-90 flex justify-center items-center"
      onClick={cancelOnClick}
    >
      <div
        className=" text-white shadow-md rounded-xl overflow-hidden m-5"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="text-center p-5 bg-indigo-700 ">
          <h1 className="text-lg">{popupHeader}</h1>
        </header>
        <main className="p-5 bg-indigo-500 flex justify-center items-center gap-5">
          <button
            type="button"
            className=" bg-indigo-900 p-2 rounded-lg hover:bg-indigo-700"
            onClick={confirmOnClick}
          >
            {confirmText}
          </button>
          <button
            type="button"
            className=" bg-indigo-900 p-2 rounded-lg hover:bg-indigo-700"
            onClick={cancelOnClick}
          >
            {cancelText}
          </button>
        </main>
      </div>
    </div>
  );
}
