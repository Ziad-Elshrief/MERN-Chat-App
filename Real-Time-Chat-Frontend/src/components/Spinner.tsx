import { Loader2 } from "lucide-react";

export default function Spinner() {
  return (
    <div role="status" className="flex justify-center items-center mt-32">
      <Loader2 className="size-40 text-indigo-700 animate-spin" />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
