import { useState } from "react";
import {
  ChevronLeft,
  Video,
  Phone,
  Plus,
  Camera,
  Mic,
  Paperclip,
} from "lucide-react";
import Message from "./Message";
import whatsappBackground from "../assets/images/whatsappbg.webp";
import { useNavigate } from "react-router-dom";

interface MessageData {
  id: number;
  text?: string;
  type?: "file" | "text";
  filename?: string;
  size?: string;
  format?: string;
  sender: "me" | "them";
  time: string;
  read?: boolean;
  date?: string;
}

const messages: MessageData[] = [
  {
    id: 1,
    text: "Good bye!",
    sender: "me",
    time: "17:47",
    read: true,
    date: "Fri, Jul 26",
  },
  {
    id: 2,
    text: "Good morning!",
    sender: "me",
    time: "10:10",
    read: true,
  },
  {
    id: 3,
    text: "Japan looks amazing!",
    sender: "me",
    time: "10:10",
    read: true,
  },
  {
    id: 4,
    type: "file",
    filename: "IMG_0475",
    size: "2.4 MB",
    format: "png",
    sender: "me",
    time: "10:15",
    read: true,
  },
  {
    id: 5,
    type: "file",
    filename: "IMG_0481",
    size: "2.8 MB",
    format: "png",
    sender: "me",
    time: "10:15",
    read: true,
  },
  {
    id: 6,
    text: "Do you know what time is it?",
    sender: "them",
    time: "11:40",
  },
  {
    id: 7,
    text: "It's morning in Tokyo 😎",
    sender: "me",
    time: "11:43",
    read: true,
  },
  {
    id: 8,
    text: "What is the most popular meal in Japan?",
    sender: "them",
    time: "11:45",
  },
  { id: 9, text: "Do you like it?", sender: "them", time: "11:45" },
  {
    id: 10,
    text: "I think top two are:",
    sender: "me",
    time: "11:50",
    read: true,
  },
  {
    id: 11,
    type: "file",
    filename: "IMG_0483",
    size: "2.8 MB",
    format: "png",
    sender: "me",
    time: "11:51",
    read: true,
  },
  {
    id: 12,
    type: "file",
    filename: "IMG_0484",
    size: "2.6 MB",
    format: "png",
    sender: "me",
    time: "11:51",
    read: true,
  },
];

export default function Chat() {
  const [inputValue, setInputValue] = useState<string>("");
  const navigate = useNavigate();

  const onBack = () => {
    navigate(-1);
  };

  return (
    <div className="relative flex flex-col h-screen bg-[#e5ddd5]">
      {/* whatsapp background bg */}
      <img
        src={whatsappBackground}
        alt="whatsapp background"
        className="absolute top-0 left-0 w-full h-full opacity-40 object-cover"
      />

      <div className="relative z-10 flex flex-col h-screen">
        <header className="bg-gray-100 px-4 py-3 flex items-center gap-4 shrink-0">
          <button className="text-blue-600" onClick={onBack}>
            <ChevronLeft size={24} />
          </button>

          <div className="w-10 h-10 rounded-full bg-gray-300 shrink-0 overflow-hidden">
            <div className="w-full h-full bg-linear-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-semibold">
              MC
            </div>
          </div>

          <div className="flex-1">
            <h2 className="font-semibold text-base text-[#111b21]">
              Martha Craig
            </h2>

            <p className="text-xs text-[#667781]">online</p>
          </div>

          <button className="text-[#54656f]">
            <Video size={24} />
          </button>

          <button className="text-[#54656f]">
            <Phone size={20} />
          </button>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-2 min-h-0 hide-scrollbar">
          {messages.map((msg, index) => {
            const prevMsg = index > 0 ? messages[index - 1] : null;
            const showDate =
              msg.date && (!prevMsg || prevMsg.date !== msg.date);
            return (
              <div key={msg.id}>
                {showDate && (
                  <div className="text-center text-xs text-gray-600 my-4">
                    {msg.date}
                  </div>
                )}
                <Message
                  text={msg.text}
                  type={msg.type}
                  filename={msg.filename}
                  size={msg.size}
                  format={msg.format}
                  sender={msg.sender}
                  time={msg.time}
                  read={msg.read}
                />
              </div>
            );
          })}
        </div>

        {/* Input Bar */}
        <div className="bg-white px-2 py-2 flex items-center gap-2 border-t border-gray-200 shrink-0">
          <button className="text-blue-600 p-2 hover:bg-gray-100 rounded-full">
            <Plus size={24} />
          </button>

          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message"
            className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-0"
          />

          <button className="text-[#54656f] p-2 hover:bg-gray-100 rounded-full">
            <Paperclip size={24} />
          </button>

          <button className="text-[#54656f] p-2 hover:bg-gray-100 rounded-full">
            <Camera size={24} />
          </button>

          <button className="text-[#54656f] p-2 hover:bg-gray-100 rounded-full">
            <Mic size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
