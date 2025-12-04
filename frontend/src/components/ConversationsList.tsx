import { useState } from "react";
import {
  Menu,
  Camera,
  Plus,
  Search,
  ChevronDown,
  Circle,
  Phone,
  Camera as CameraIcon,
  MessageCircle,
  Settings,
  Ellipsis,
} from "lucide-react";
import ChatListItem, { Conversation } from "./ChatListItem";
import ArchiveIcon from "./icons";

const conversations: Conversation[] = [
  {
    id: 1,
    name: "Skillzo fabrics",
    lastMessage: "✓ You: 📷 Photo",
    time: "Yesterday",
    unread: false,
    read: true,
    pinned: true,
  },
  {
    id: 2,
    name: "Big 4 Practice Group",
    lastMessage: "~ ifeoluwaoladapo: Yes",
    time: "1:42 AM",
    unread: true,
    unreadCount: 299,
    isGroup: true,
    lastMessageSender: "ifeoluwaoladapo",
  },
  {
    id: 3,
    name: "AWS DevOps Study Group (Hand-On)",
    lastMessage:
      "~ Amb_Sam ✨: But that day I gave AWS support respect. Those guys have access to all our server...",
    time: "12:33 AM",
    unread: true,
    unreadCount: 106,
    isGroup: true,
    lastMessageSender: "Amb_Sam ✨",
  },
  {
    id: 4,
    name: "React Native Lagos Community",
    lastMessage:
      "React Native Lagos ▶ That moment when you need to sleep to code better... but you need to code to sleep bet...",
    unread: true,
    unreadCount: 60,
    isGroup: true,
  },
  {
    id: 5,
    name: "React.js",
    lastMessage:
      "~ Error: That moment when you need to sleep to code better... but you need to code to sleep bet...",
    time: "12:16 AM",
    unread: true,
    unreadCount: 999,
    isGroup: true,
    lastMessageSender: "Error",
  },
  {
    id: 6,
    name: "1000 OSOGBO CONTACTS GAIN GR...",
    lastMessage: "You joined using a group link.",
    time: "Yesterday",
    unread: false,
    isGroup: true,
  },
  {
    id: 7,
    name: "Daniel Dona 2",
    lastMessage:
      "✓✓ How much do you buy crepe in aba and how much do you sell now.",
    time: "Yesterday",
    unread: false,
    read: true,
  },
  {
    id: 8,
    name: "GiDi 001",
    lastMessage: "Night deals can come",
    time: "Yesterday",
    unread: false,
    loading: true,
  },
];

export default function ConversationsList() {
  const [swipedId, setSwipedId] = useState<number | null>(null);

  return (
    <div className="flex flex-col h-screen bg-white px-4">
      <header className="bg-white py-3 fbc">
        <button className="text-[#111b21] p-1 bg-gray-100 rounded-full">
          <Ellipsis size={20} />
        </button>

        <h1 className="text-lg font-semibold text-[#111b21]"></h1>

        <div className="flex items-center gap-2">
          <button className="text-[#111b21] p-2">
            <Camera size={24} />
          </button>
          <button className="bg-[#25d366] rounded-full p-2">
            <Plus size={20} className="text-white" />
          </button>
        </div>
      </header>

      <h1 className="text-2xl font-semibold text-[#111b21]">Chats</h1>

      {/* Search Bar */}
      <div className="py-2 bg-white">
        <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-2">
          <Search size={18} className="text-[#667781]" />

          <input
            type="text"
            placeholder="Ask Meta AI or Search"
            className="flex-1 bg-transparent text-sm text-[#111b21] placeholder:text-[#667781] outline-none"
          />
        </div>
      </div>

      <div className="py-3 bg-white border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ArchiveIcon size={20} className="text-[#667781]" />

          <span className="text-sm font-medium text-[#111b21]">Archived</span>
        </div>
        <span className="text-xs text-[#667781]">61</span>
      </div>

      <div className="flex-1 overflow-y-auto bg-white hide-scrollbar">
        {conversations.map((conversation) => (
          <ChatListItem
            key={conversation.id}
            conversation={conversation}
            isSwiped={swipedId === conversation.id}
            onSwipe={() => setSwipedId(conversation.id)}
            onSwipeClose={() => setSwipedId(null)}
            onClick={() => {}}
          />
        ))}
      </div>

      <nav className="bg-white border-t border-gray-200 flex items-center justify-around py-2">
        <button className="flex flex-col items-center gap-1 py-1">
          <Circle size={24} className="text-[#54656f]" />
          <span className="text-xs text-[#54656f]">Status</span>
        </button>

        <button className="flex flex-col items-center gap-1 py-1">
          <Phone size={24} className="text-[#54656f]" />
          <span className="text-xs text-[#54656f]">Calls</span>
        </button>
        <button className="flex flex-col items-center gap-1 py-1">
          <CameraIcon size={24} className="text-[#54656f]" />
          <span className="text-xs text-[#54656f]">Camera</span>
        </button>
        <button className="flex flex-col items-center gap-1 py-1">
          <MessageCircle size={24} className="text-[#25d366]" />
          <span className="text-xs text-[#25d366]">Chats</span>
        </button>
        <button className="flex flex-col items-center gap-1 py-1">
          <Settings size={24} className="text-[#54656f]" />
          <span className="text-xs text-[#54656f]">Settings</span>
        </button>
      </nav>
    </div>
  );
}
