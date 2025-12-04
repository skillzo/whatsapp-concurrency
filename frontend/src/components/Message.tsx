import { CheckCheck } from "lucide-react";

interface MessageProps {
  text?: string;
  type?: "file" | "text";
  filename?: string;
  size?: string;
  format?: string;
  sender: "me" | "them";
  time: string;
  read?: boolean;
}

export default function Message({
  text,
  type,
  filename,
  size,
  format,
  sender,
  time,
  read,
}: MessageProps) {
  const isMe = sender === "me";

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"} mb-1`}>
      <div
        className={`max-w-[75%] rounded-lg px-3 py-2 ${
          isMe
            ? "bg-[#dcf8c6] rounded-tr-none"
            : "bg-white rounded-tl-none"
        } shadow-sm`}
      >
        {type === "file" ? (
          <div className="flex items-center gap-3">
            <div className="text-2xl text-[#54656f]">≡</div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm text-[#111b21] truncate">
                {filename}
              </div>
              <div className="text-xs text-[#667781]">
                {size} • {format}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-[#111b21] whitespace-pre-wrap break-words">
            {text}
          </p>
        )}

        <div
          className={`flex items-center gap-1 mt-1 ${isMe ? "justify-end" : "justify-start"}`}
        >
          <span className="text-[0.6875rem] text-[#667781]">{time}</span>
          {isMe && read && (
            <CheckCheck size={16} className="text-[#53bdeb]" />
          )}
        </div>
      </div>
    </div>
  );
}

