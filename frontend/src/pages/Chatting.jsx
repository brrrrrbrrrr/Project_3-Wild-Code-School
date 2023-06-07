import ChatCandidat from "../components/chat/ChatCandidat";
import Chat from "../components/chat/Chat";
import { useUser } from "../contexts/UserContext";

export default function Chatting() {
  const user = useUser();

  return (
    <div>
      {user?.user?.userType === "consultants" ? <Chat /> : <ChatCandidat />}
    </div>
  );
}
