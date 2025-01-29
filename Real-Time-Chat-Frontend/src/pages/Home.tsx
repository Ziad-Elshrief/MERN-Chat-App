import { MessagesSquare } from "lucide-react";
import Container from "../components/Container";
import bg from "/home_bg.png";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div
        className=" bg-cover bg-center w-full relative h-[calc(100dvh-68px)] overflow-hidden"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <Container>
          <div className="w-full max-w-xl my-6 text-white shadow-md rounded-xl overflow-hidden">
            <header className="text-center px-5 py-5 bg-indigo-700 ">
              <Link to="/" className="text-white text-lg">
                <MessagesSquare className="inline mr-0.5 mb-1" /> Chat App
              </Link>
              <h1 className="text-xl text-center font-bold mt-2">
                Enjoy the ablility to join a chat room with your friends with a
                variety of cool features.
              </h1>
            </header>
            <main className="py-5 px-8 bg-white dark:bg-slate-700 text-black dark:text-white">
              If you have an account,{" "}
              <Link to="/login" className="inline-block font-bold underline">
                Sign in
              </Link>{" "}
              now to{" "}
              <Link
                to="/join-chat"
                className="inline-block font-bold underline"
              >
                Join or create a room
              </Link>{" "}
              and if you do not have an account you can always{" "}
              <Link to="/register" className="inline-block font-bold underline">
                Create one
              </Link>
              .
            </main>
          </div>
        </Container>
      </div>
    </>
  );
}
