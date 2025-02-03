import { User, X } from "lucide-react";
import { profilePictures } from "../utils/profilePictures";

type ViewProfilePicturePropsType = {
  viewProfilePicture: string;
  setViewProfilePicture: React.Dispatch<React.SetStateAction<string>>;
};

export default function ProfilePictureViewer({
  setViewProfilePicture,
  viewProfilePicture,
}: ViewProfilePicturePropsType) {
  const index = viewProfilePicture.substring(
    0,
    viewProfilePicture.indexOf("-")
  );
  const username = viewProfilePicture.substring(
    viewProfilePicture.indexOf("-") + 1
  );
  return (
    <div
      className="absolute top-0 left-0 w-full h-full z-[21] bg-slate-800 bg-opacity-90"
      onClick={() => setViewProfilePicture("")}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute bottom-1/2 translate-y-1/2 right-[20%] rounded-xl p-3 space-y-4 h-fit w-[60%] max-w-72 shadow-md bg-slate-300 dark:bg-slate-700 dark:text-white overflow-hidden"
      >
        <header className="flex justify-between items-center px-1.5">
          <h3 className="bg-indigo-800 text-white rounded-xl p-2">
            <User className="inline mb-1 mr-0.5 size-4" /> {username}
          </h3>
          <button onClick={() => setViewProfilePicture("")}>
            <X className="text-indigo-900 dark:text-indigo-300" size={24} />
          </button>
        </header>
        <img
          src={profilePictures[Number(index || 0)]}
          alt={username}
          className="w-fit max-w-64 object-contain rounded-2xl"
        />
      </div>
    </div>
  );
}
