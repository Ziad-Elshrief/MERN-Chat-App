import bg from "/home_bg.png";

export default function Home() {
  return (
    <>
      <div className="bg-slate-700 w-full  h-[calc(100dvh-68px)] overflow-hidden">
        <img
          src={bg}
          alt="background"
          className="opacity-85 w-full h-full object-cover object-center"
        />
      </div>
    </>
  );
}
