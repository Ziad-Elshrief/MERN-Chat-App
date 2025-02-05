import { MessagesSquare } from "lucide-react";
import Container from "../components/Container";
import bg from "/home_bg.png";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <div
        className=" bg-cover bg-center w-full relative h-[calc(100vh-68px)] overflow-hidden"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <Container>
          <div className="w-full max-w-xl my-6 text-white shadow-md rounded-xl overflow-hidden">
            <header className="text-center px-5 py-5 bg-indigo-700 ">
              <Link to="/" className="text-white text-lg">
                <MessagesSquare className="inline mr-0.5 mb-1" /> Chat App
              </Link>
              <h1 className="text-xl text-center font-bold my-2">
                <strong className="block text-3xl mb-3">404</strong>
                Oops Page Not found 😔
              </h1>
              <p className="text-gray-300 text-lg">
                Get back to{" "}
                <Link to="/" className=" underline">
                  Home Page
                </Link>
              </p>
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
