import { useRef, useState, useEffect } from "react";
import {
  MoreVertical,
  Archive,
  CheckCheck,
  Mic,
  Camera,
  ChevronRight,
  Pin,
} from "lucide-react";
import { Link } from "react-router-dom";

export interface Conversation {
  id: number;
  name: string;
  lastMessage: string;
  time?: string;
  unread: boolean;
  read?: boolean;
  voiceMessage?: boolean;
  voiceDuration?: string;
  photo?: boolean;
  unreadCount?: number;
  pinned?: boolean;
  isGroup?: boolean;
  lastMessageSender?: string;
  loading?: boolean;
}

interface ChatListItemProps {
  conversation: Conversation;
  isSwiped: boolean;
  onSwipe: () => void;
  onSwipeClose: () => void;
  onClick: () => void;
}

export default function ChatListItem({
  conversation,
  isSwiped,
  onSwipe,
  onSwipeClose,
  onClick,
}: ChatListItemProps) {
  const [swipeOffset, setSwipeOffset] = useState<number>(isSwiped ? 160 : 0);
  const itemRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef<number | null>(null);
  const currentXRef = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>): void => {
    startXRef.current = e.touches[0]?.clientX ?? null;
    currentXRef.current = startXRef.current;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>): void => {
    if (startXRef.current === null) return;
    currentXRef.current = e.touches[0]?.clientX ?? null;
    if (currentXRef.current === null) return;
    const diff = startXRef.current - currentXRef.current;

    if (diff > 0) {
      setSwipeOffset(Math.min(diff, 160));
      if (diff > 20 && !isSwiped) {
        onSwipe();
      }
    } else {
      setSwipeOffset(0);
      if (isSwiped) {
        onSwipeClose();
      }
    }
  };

  const handleTouchEnd = (): void => {
    if (swipeOffset > 80) {
      setSwipeOffset(160);
    } else {
      setSwipeOffset(0);
      onSwipeClose();
    }
    startXRef.current = null;
    currentXRef.current = null;
  };

  useEffect(() => {
    if (!isSwiped) {
      setSwipeOffset(0);
    } else {
      setSwipeOffset(160);
    }
  }, [isSwiped]);

  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getAvatarColor = (name: string): string => {
    const colors = [
      "from-blue-400 to-purple-500",
      "from-green-400 to-blue-500",
      "from-pink-400 to-red-500",
      "from-yellow-400 to-orange-500",
      "from-indigo-400 to-purple-500",
      "from-teal-400 to-green-500",
      "from-cyan-400 to-blue-500",
      "from-rose-400 to-pink-500",
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index] ?? colors[0] ?? "";
  };

  return (
    <Link
      to={`/chat/${conversation.id}`}
      className="relative overflow-hidden border-b last:border-b-0 border-gray-100"
    >
      <div
        className="absolute right-0 top-0 bottom-0 flex"
        style={{ width: "160px" }}
      >
        <button className="bg-gray-400 text-white px-4 flex items-center justify-center">
          <MoreVertical size={20} />
        </button>
        <button className="bg-[#25d366] text-white px-4 flex-1 flex items-center justify-center gap-2">
          <Archive size={20} />
          <span className="text-sm font-medium">Archive</span>
        </button>
      </div>

      <div
        ref={itemRef}
        className="relative bg-white flex items-center gap-3 py-3  active:bg-gray-50 transition-transform duration-200"
        style={{ transform: `translateX(-${swipeOffset}px)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={onClick}
      >
        {/* Avatar */}
        <div
          className={`w-14 h-14 rounded-full bg-gradient-to-br ${getAvatarColor(
            conversation.name
          )} flex items-center justify-center text-white text-sm font-semibold flex-shrink-0`}
        >
          {getInitials(conversation.name)}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <h3 className="font-medium text-[#111b21] text-base truncate">
                {conversation.name}
              </h3>
              {conversation.pinned && (
                <Pin size={14} className="text-[#667781] shrink-0" />
              )}
            </div>
            <div className="flex items-center gap-2 shrink-0 ml-2">
              {conversation.time && (
                <span className="text-xs text-[#667781]">
                  {conversation.time}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1">
            {conversation.read && !conversation.isGroup && (
              <CheckCheck size={16} className="text-[#53bdeb] shrink-0" />
            )}
            {conversation.voiceMessage && (
              <div className="flex items-center gap-1 text-[#667781]">
                <Mic size={14} />
                <span className="text-sm">{conversation.voiceDuration}</span>
              </div>
            )}
            {conversation.photo && (
              <div className="flex items-center gap-1 text-[#667781]">
                <Camera size={14} />
                <span className="text-sm">Photo</span>
              </div>
            )}
            {!conversation.voiceMessage && !conversation.photo && (
              <p className="text-sm text-[#667781] truncate">
                {conversation.lastMessage}
              </p>
            )}
          </div>
        </div>

        {/* Unread Count or Chevron */}
        <div className="shrink-0">
          {conversation.unread && conversation.unreadCount ? (
            <div className="bg-[#25d366] rounded-full px-2 py-0.5 min-w-[20px] flex items-center justify-center">
              <span className="text-xs font-medium text-white">
                {conversation.unreadCount > 999
                  ? "999+"
                  : conversation.unreadCount}
              </span>
            </div>
          ) : (
            <ChevronRight size={20} className="text-[#667781]" />
          )}
        </div>
      </div>
    </Link>
  );
}
