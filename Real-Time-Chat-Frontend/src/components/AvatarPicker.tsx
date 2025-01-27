import { profilePictures } from "../utils/profilePictures";

type AvatarPickerProps = {
  avatar: number;
  setAvatar: React.Dispatch<React.SetStateAction<number>>;
};

export default function AvatarPicker({ avatar, setAvatar }: AvatarPickerProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3 py-2.5 h-36 sm:h-40 overflow-y-auto">
      {profilePictures.map((pic, index) => (
        <img
          key={index}
          src={pic}
          alt="User"
          id={`profile${index}`}
          className={`size-14 sm:size-16 object-contain rounded-full border-[6px] cursor-pointer ${
            avatar === index ? "border-indigo-900" : "border-gray-400"
          } `}
          onClick={(e) => setAvatar(Number(e.currentTarget.id.slice(7)))}
        />
      ))}
    </div>
  );
}
