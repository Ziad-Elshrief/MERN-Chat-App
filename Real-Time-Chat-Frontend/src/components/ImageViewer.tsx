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
    <div className=" w-full h-full relative bg-black flex justify-center items-center overflow-hidden">
      <img src={viewImage} alt="image" className="max-h-[80%]" />
      <button
        title="Close image"
        aria-label="Close image"
        className="absolute right-2 top-2"
        onClick={() => setViewImage("")}
      >
        <X className="text-indigo-400 " size={24} />
      </button>
    </div>
  );
}
