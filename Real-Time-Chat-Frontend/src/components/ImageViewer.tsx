import { X } from "lucide-react";

type ImageViewerPropsType = {
  viewImage: string;
  setViewImage: React.Dispatch<React.SetStateAction<string>>;
};

export default function ImageViewer({
  viewImage,
  setViewImage,
}: ImageViewerPropsType) {
  return (
    <div className="absolute top-0 left-0 w-full z-30 h-[calc(100dvh-136px)] bg-black flex justify-center items-center overflow-hidden">
      <img src={viewImage} alt="image" className="max-h-96" />
      <button
        className="absolute right-2 top-2 z-[35]"
        onClick={() => setViewImage("")}
      >
        <X className="text-indigo-400 " size={24} />
      </button>
    </div>
  );
}
