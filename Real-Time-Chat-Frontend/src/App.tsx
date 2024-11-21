import { useState } from "react";
import ChatRoom from "./components/ChatRoom";
import JoinChat from "./components/JoinChat";


export default function App() {
  const [joined, setJoined] = useState(false);
 
  return <>{joined ? <ChatRoom  setJoined={setJoined} /> : <JoinChat setJoined={setJoined} />}</>;
}
