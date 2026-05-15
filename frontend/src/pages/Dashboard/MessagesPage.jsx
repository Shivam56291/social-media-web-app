import { useEffect, useState } from "react";
import {
  MagnifyingGlass,
  Plus,
  Phone,
  VideoCamera,
  Info,
  Paperclip,
  Smiley,
  PaperPlaneRight,
  Checks,
  Image as ImageIcon,
  FileText,
  Microphone,
  DotsThree,
} from "@phosphor-icons/react";

/* --- MOCK DATA --- */
const FILTERS = ["All", "Unread", "Groups"];

const MOCK_CHATS = [
  {
    id: 1,
    name: "Sophia Carter",
    avatarBg: "from-pink-500 to-rose-500",
    lastMessage: "The new design system looks insanely clean 🔥",
    time: "2m",
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: "James Wilson",
    avatarBg: "from-cyan-500 to-blue-500",
    lastMessage: "Can you send over the latest pitch deck?",
    time: "1h",
    unread: 0,
    online: false,
  },
  {
    id: 3,
    name: "Product Team",
    avatarBg: "from-indigo-500 to-violet-500",
    lastMessage: "Emma: We are launching on Product Hunt tomorrow!",
    time: "4h",
    unread: 5,
    online: true,
    isGroup: true,
  },
  {
    id: 4,
    name: "Lucas Chen",
    avatarBg: "from-emerald-500 to-teal-500",
    lastMessage: "Sent an attachment",
    time: "Yesterday",
    unread: 0,
    online: false,
  },
];

const MOCK_MESSAGES = [
  {
    id: 1,
    sender: "Sophia Carter",
    isMe: false,
    type: "text",
    content: "Hey! Did you get a chance to look at the updated Figma files?",
    time: "10:24 AM",
  },
  {
    id: 2,
    sender: "Me",
    isMe: true,
    type: "text",
    content: "Yes! Just reviewing them now. The new glassmorphism components are stunning.",
    time: "10:30 AM",
    status: "read",
  },
  {
    id: 3,
    sender: "Me",
    isMe: true,
    type: "image",
    content: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&q=80&w=600",
    time: "10:31 AM",
    status: "read",
  },
  {
    id: 4,
    sender: "Sophia Carter",
    isMe: false,
    type: "text",
    content: "The new design system looks insanely clean 🔥",
    time: "10:33 AM",
  },
  {
    id: 5,
    sender: "Sophia Carter",
    isMe: false,
    type: "document",
    fileName: "Design_Guidelines_v2.pdf",
    fileSize: "2.4 MB",
    time: "10:34 AM",
  },
];

export default function MessagesPage() {
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeChat, setActiveChat] = useState(MOCK_CHATS[0].id);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    // Simulate network loading for Shimmer UI
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const activeChatDetails = MOCK_CHATS.find((c) => c.id === activeChat);

  return (
    <div className="flex h-[calc(100vh-2rem)] w-full gap-6 overflow-hidden">
      {/* LEFT PANEL: CHAT LIST */}
      <aside className="flex w-full flex-col overflow-hidden lg:w-[380px] xl:w-[420px] shrink-0">
        {/* HEADER */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-black tracking-tight text-white">
            Messages
          </h1>
          <Tooltip text="New Conversation">
            <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 text-white shadow-lg shadow-indigo-500/20 transition-transform hover:scale-105">
              <Plus size={20} weight="bold" />
            </button>
          </Tooltip>
        </div>

        {/* SEARCH BAR */}
        <div className="group relative mb-6">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4">
            <MagnifyingGlass
              size={20}
              className="text-slate-400 transition-colors group-focus-within:text-cyan-400"
            />
          </div>
          <input
            type="text"
            placeholder="Search messages..."
            className="w-full rounded-2xl border border-white/10 bg-white/[0.03] py-3.5 pl-11 pr-4 text-sm text-white placeholder-slate-500 outline-none transition-all focus:border-cyan-500/50 focus:bg-white/[0.05] focus:ring-4 focus:ring-cyan-500/10"
          />
        </div>

        {/* FILTERS */}
        <div className="mb-4 flex gap-2 overflow-x-auto scrollbar-hide">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`whitespace-nowrap rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                activeFilter === filter
                  ? "bg-white text-black shadow-md"
                  : "bg-white/[0.04] text-slate-400 hover:bg-white/[0.08] hover:text-white"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* CHAT LIST */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20">
          {loading ? (
            <>
              <ChatListSkeleton />
              <ChatListSkeleton />
              <ChatListSkeleton />
              <ChatListSkeleton />
            </>
          ) : (
            MOCK_CHATS.map((chat) => (
              <ChatListItem
                key={chat.id}
                chat={chat}
                isActive={activeChat === chat.id}
                onClick={() => setActiveChat(chat.id)}
              />
            ))
          )}
        </div>
      </aside>

      {/* RIGHT PANEL: ACTIVE CHAT */}
      <main className="hidden flex-1 flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] lg:flex relative">
        {loading ? (
          <div className="flex h-full w-full items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent" />
          </div>
        ) : (
          <>
            {/* CHAT HEADER */}
            <header className="flex items-center justify-between border-b border-white/10 bg-white/[0.01] px-6 py-4 backdrop-blur-md">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${activeChatDetails.avatarBg} text-lg font-bold text-white shadow-lg`}
                  >
                    {activeChatDetails.name.charAt(0)}
                  </div>
                  {activeChatDetails.online && (
                    <div className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-[#0B1120] bg-emerald-500" />
                  )}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">
                    {activeChatDetails.name}
                  </h2>
                  <p className="text-sm text-cyan-400">
                    {activeChatDetails.online ? "Online now" : "Last seen recently"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <IconButton icon={<Phone size={22} />} tooltip="Voice Call" />
                <IconButton icon={<VideoCamera size={22} />} tooltip="Video Call" />
                <div className="ml-2 h-6 w-px bg-white/10" />
                <IconButton icon={<Info size={22} />} tooltip="Details" />
              </div>
            </header>

            {/* MESSAGES AREA */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
              {MOCK_MESSAGES.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}
              {/* Dummy div to scroll to bottom */}
              <div className="h-1" />
            </div>

            {/* INPUT AREA */}
            <div className="p-4 px-6 pt-2">
              <div className="flex items-end gap-3 rounded-3xl border border-white/10 bg-white/[0.04] p-2 backdrop-blur-md transition-all focus-within:border-cyan-500/50 focus-within:bg-white/[0.06]">
                <div className="flex pb-1 pl-2 gap-1">
                  <Tooltip text="Attach File">
                    <button className="p-2 text-slate-400 transition-colors hover:text-cyan-400">
                      <Paperclip size={22} />
                    </button>
                  </Tooltip>
                  <Tooltip text="Insert Image">
                    <button className="hidden sm:block p-2 text-slate-400 transition-colors hover:text-indigo-400">
                      <ImageIcon size={22} />
                    </button>
                  </Tooltip>
                </div>

                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type a message..."
                  className="max-h-32 min-h-[44px] flex-1 resize-none bg-transparent py-3 px-2 text-sm text-white placeholder-slate-500 outline-none scrollbar-hide"
                  rows={1}
                />

                <div className="flex items-center gap-2 pb-1 pr-1">
                  <Tooltip text="Emoji">
                    <button className="p-2 text-slate-400 transition-colors hover:text-yellow-400">
                      <Smiley size={22} />
                    </button>
                  </Tooltip>
                  {inputText.trim().length === 0 ? (
                    <Tooltip text="Voice Message">
                      <button className="p-3 rounded-xl bg-white/[0.05] text-white transition-colors hover:bg-white/[0.1]">
                        <Microphone size={20} weight="fill" />
                      </button>
                    </Tooltip>
                  ) : (
                    <Tooltip text="Send Message">
                      <button className="group flex p-3 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-lg shadow-cyan-500/20 transition-all hover:scale-105">
                        <PaperPlaneRight
                          size={20}
                          weight="fill"
                          className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </button>
                    </Tooltip>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

/* --- SUB-COMPONENTS --- */

function ChatListItem({ chat, isActive, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`group flex cursor-pointer items-center gap-4 rounded-2xl p-4 transition-all duration-300 ${
        isActive
          ? "bg-gradient-to-r from-white/[0.08] to-transparent border border-white/10"
          : "border border-transparent hover:bg-white/[0.04]"
      }`}
    >
      <div className="relative shrink-0">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${chat.avatarBg} text-xl font-bold text-white shadow-lg`}
        >
          {chat.name.charAt(0)}
        </div>
        {chat.online && (
          <div className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-[#0B1120] bg-emerald-500" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center justify-between">
          <h3 className={`truncate font-semibold ${isActive ? "text-white" : "text-slate-200"}`}>
            {chat.name}
          </h3>
          <span className="text-xs text-slate-500 shrink-0">{chat.time}</span>
        </div>
        <p className={`truncate text-sm ${chat.unread > 0 ? "font-medium text-slate-300" : "text-slate-500"}`}>
          {chat.lastMessage}
        </p>
      </div>

      {chat.unread > 0 && (
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 text-xs font-bold text-white shadow-lg shadow-cyan-500/20">
          {chat.unread}
        </div>
      )}
    </div>
  );
}

function MessageBubble({ message }) {
  const { isMe, type, content, time, status, fileName, fileSize } = message;

  return (
    <div className={`flex w-full ${isMe ? "justify-end" : "justify-start"}`}>
      <div className={`group flex max-w-[75%] lg:max-w-[65%] flex-col gap-1 ${isMe ? "items-end" : "items-start"}`}>
        
        {/* MESSAGE CONTENT */}
        <div
          className={`relative overflow-hidden rounded-2xl px-5 py-3.5 shadow-sm transition-all ${
            isMe
              ? "rounded-br-sm bg-gradient-to-br from-indigo-500 to-cyan-500 text-white shadow-cyan-500/10"
              : "rounded-bl-sm border border-white/10 bg-white/[0.05] text-slate-200"
          }`}
        >
          {/* Text Message */}
          {type === "text" && <p className="text-sm leading-relaxed">{content}</p>}

          {/* Image Message */}
          {type === "image" && (
            <div className="-mx-5 -mt-3.5 -mb-3.5 cursor-pointer">
              <img src={content} alt="Attachment" className="w-full max-w-sm object-cover hover:opacity-90 transition-opacity" />
            </div>
          )}

          {/* Document Message */}
          {type === "document" && (
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                <FileText size={22} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold truncate max-w-[200px]">{fileName}</p>
                <p className="text-xs text-white/70">{fileSize} • PDF</p>
              </div>
            </div>
          )}
        </div>

        {/* METADATA (Time & Status) */}
        <div className={`flex items-center gap-1.5 px-1 opacity-0 transition-opacity group-hover:opacity-100 ${isMe ? "flex-row-reverse" : "flex-row"}`}>
          <span className="text-[11px] font-medium text-slate-500">{time}</span>
          {isMe && (
            <Checks
              size={14}
              className={status === "read" ? "text-cyan-400" : "text-slate-500"}
              weight="bold"
            />
          )}
        </div>
      </div>
    </div>
  );
}

function IconButton({ icon, tooltip }) {
  return (
    <Tooltip text={tooltip} position="bottom">
      <button className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 transition-all hover:bg-white/[0.08] hover:text-white">
        {icon}
      </button>
    </Tooltip>
  );
}

function Tooltip({ children, text, position = "top" }) {
  return (
    <div className="group relative flex items-center justify-center">
      {children}
      <div
        className={`absolute whitespace-nowrap rounded-lg bg-[#1E293B] px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-xl transition-all group-hover:opacity-100 pointer-events-none z-50
        ${position === "top" ? "-top-10" : ""}
        ${position === "bottom" ? "-bottom-10" : ""}
      `}
      >
        {text}
        <div
          className={`absolute left-1/2 -ml-1 border-4 border-transparent
          ${position === "top" ? "top-full border-t-[#1E293B]" : ""}
          ${position === "bottom" ? "bottom-full border-b-[#1E293B]" : ""}
        `}
        />
      </div>
    </div>
  );
}

function ChatListSkeleton() {
  return (
    <div className="flex animate-pulse items-center gap-4 rounded-2xl p-4">
      <div className="h-14 w-14 shrink-0 rounded-2xl bg-white/10" />
      <div className="flex-1 space-y-3">
        <div className="flex items-center justify-between">
          <div className="h-4 w-1/2 rounded-full bg-white/10" />
          <div className="h-3 w-8 rounded-full bg-white/5" />
        </div>
        <div className="h-3 w-3/4 rounded-full bg-white/5" />
      </div>
    </div>
  );
}