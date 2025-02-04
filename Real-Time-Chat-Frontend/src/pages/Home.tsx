import { Users, MessageSquare, Smile, Send, LayoutList } from "lucide-react";
import Container from "../components/Container";
import bg from "/home_bg.png";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div
        className=" bg-cover bg-center w-full relative min-h-[calc(100dvh-68px)] overflow-hidden"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <Container>
          <div className="w-full max-w-xl my-6 text-white shadow-md rounded-xl overflow-hidden">
            <section className="bg-indigo-700 text-white py-20">
              <div className="container mx-auto px-6 text-center">
                <h1 className="text-3xl sm:text-5xl font-bold mb-4">
                  Connect with Friends in Real-Time
                </h1>
                <p className="text-xl mb-8">
                  Create rooms, send messages, share images, and stay connected.
                </p>
                <Link
                  to="/join-chat"
                  className="inline-flex items-center gap-x-1 rounded-md bg-black  px-3 py-2 font-semibold text-white ring-1 shadow-xs ring-indigo-400 ring-inset hover:bg-indigo-500 focus:bg-indigo-500"
                >
                  <Send className="size-4" />
                  Get Started
                </Link>
              </div>
            </section>
          </div>
        </Container>
      </div>
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold flex justify-center gap-x-1 items-center mb-12 dark:text-white">
            <LayoutList /> Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Users className="h-8 w-8 text-indigo-500" />}
              title="Create Rooms"
              description="Set up private or group chat rooms for different conversations."
            />
            <FeatureCard
              icon={<MessageSquare className="h-8 w-8 text-indigo-500" />}
              title="Rich Messaging"
              description="Send text and image messages to express yourself fully."
            />
            <FeatureCard
              icon={<Smile className="h-8 w-8 text-indigo-500" />}
              title="Interact & React"
              description="Reply to messages and react with emojis to keep conversations lively."
            />
          </div>
        </div>
      </section>

      <footer className="bg-indigo-800 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; {new Date().getFullYear()} ChatApp. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-indigo-200 p-6 rounded-lg shadow-md flex flex-col items-center text-center">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-indigo-700 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
