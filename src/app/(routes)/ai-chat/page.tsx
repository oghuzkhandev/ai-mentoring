"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Plus,
  Loader2,
  Sparkles,
  Briefcase,
  Trash2,
  Menu,
  X,
} from "lucide-react";
import SideBar from "../../components/SideBar";
import { useUser } from "@clerk/nextjs";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type ChatMode = "career" | "kanka";

type Conversation = {
  id: string;
  title: string;
  mode: ChatMode;
  messages: Message[];
  createdAt: Date;
};

function MessageContent({ content }: { content: string }) {
  return (
    <>
      {content.split("\n").map((line, idx) => {
        const isHeading =
          /^[A-Z\s]+:?\s*$/.test(line.trim()) || /^[A-Z\s]+:/.test(line.trim());
        if (isHeading) {
          return (
            <div
              key={idx}
              className="text-lg font-bold mt-3 mb-1 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            >
              {line}
            </div>
          );
        }
        return line.trim() ? (
          <div key={idx} className="leading-relaxed whitespace-pre-wrap">
            {line}
          </div>
        ) : null;
      })}
    </>
  );
}

export default function ChatBot() {
  const { user, isLoaded } = useUser();
  const [mode, setMode] = useState<ChatMode>("career");
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<
    string | null
  >(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentConversation = conversations.find(
    (c) => c.id === currentConversationId
  );
  const messages = currentConversation?.messages || [];

  useEffect(() => {
    const loadConversations = async () => {
      if (!isLoaded || !user) return;
      try {
        const res = await fetch("/api/chatload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.id }),
        });

        if (!res.ok) throw new Error("Failed to load conversations");
        const data = await res.json();

        if (Array.isArray(data) && data.length > 0) {
          setConversations(data);
          setCurrentConversationId(data[0].id);
        } else {
          // Eğer hiç konuşma yoksa varsayılan açılış mesajı
          const welcome: Conversation = {
            id: crypto.randomUUID(),
            title: "Welcome Chat",
            mode: "career",
            messages: [
              {
                id: crypto.randomUUID(),
                role: "assistant",
                content:
                  "Hello! I'm your AI Career Agent. Ask me anything about your career!",
              },
            ],
            createdAt: new Date(),
          };
          setConversations([welcome]);
          setCurrentConversationId(welcome.id);
        }
      } catch (err) {
        console.error("Failed to fetch chat history:", err);
      }
    };

    loadConversations();
  }, [isLoaded, user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const switchMode = (newMode: ChatMode) => {
    setMode(newMode);
    createNewConversation(newMode);
  };

  const createNewConversation = (chatMode: ChatMode = mode) => {
    const newConv: Conversation = {
      id: crypto.randomUUID(),
      title: "New Chat",
      mode: chatMode,
      messages: [
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            chatMode === "career"
              ? "Hello! I'm your AI Career Agent. Ask me anything about your career!"
              : "🔥 Naber gardaşım benim, ne anlatacan yine la 😄",
        },
      ],
      createdAt: new Date(),
    };
    setConversations((prev) => [newConv, ...prev]);
    setCurrentConversationId(newConv.id);
  };

  const deleteConversation = async (id: string) => {
    try {
      setConversations((prev) => prev.filter((c) => c.id !== id));

      if (currentConversationId === id) {
        const next = conversations.find((c) => c.id !== id);
        setCurrentConversationId(next ? next.id : null);
      }

      await fetch("/api/chatdelete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: id }),
      });
    } catch (err) {
      console.error("❌ Failed to delete conversation:", err);
    }
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    if (!isLoaded) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
    };

    setConversations((prev) =>
      prev.map((c) =>
        c.id === currentConversationId
          ? { ...c, messages: [...c.messages, userMsg] }
          : c
      )
    );

    setInput("");
    setLoading(true);

    try {
      const endpoint = mode === "career" ? "/api/chat-bot" : "/api/kanka-chat";
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 30000);
      const userId = user?.id ?? "guest";
      const userName = user?.fullName ?? "";
      const currentSessionId = currentConversationId ?? undefined;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userInput: text,
          sessionId: currentSessionId,
          userId,
          userName,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeout);
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Failed to get response");

      const aiResponse = data?.response || "No response received.";
      const sessionId = data?.sessionId || currentSessionId;

      if (sessionId && currentConversationId !== sessionId) {
        setConversations((prev) =>
          prev.map((c) =>
            c.id === currentConversationId ? { ...c, id: sessionId } : c
          )
        );
        setCurrentConversationId(sessionId);
      }

      const assistantMsg: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: aiResponse,
      };

      setConversations((prev) =>
        prev.map((c) =>
          c.id === (sessionId || currentConversationId)
            ? { ...c, messages: [...c.messages, assistantMsg] }
            : c
        )
      );
    } catch (error) {
      console.error("❌ Chat error:", error);
      const errorMsg: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          "Sorry, something went wrong while generating a response. Please try again.",
      };

      setConversations((prev) =>
        prev.map((c) =>
          c.id === currentConversationId
            ? { ...c, messages: [...c.messages, errorMsg] }
            : c
        )
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      <SideBar />

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-72" : "w-0"
        } transition-all duration-300 border-r border-white/10 bg-slate-900/50 backdrop-blur-xl flex flex-col`}
      >
        {sidebarOpen && (
          <>
            <div className="p-4 border-b border-white/10">
              <button
                onClick={() => createNewConversation()}
                className="w-full group relative overflow-hidden px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-blue-500/50"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <div className="relative flex items-center justify-center gap-2 font-semibold">
                  <Plus className="w-5 h-5" />
                  New Chat
                </div>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  className={`group relative rounded-xl transition-all duration-200 ${
                    currentConversationId === conv.id
                      ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30"
                      : "hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <button
                    onClick={() => {
                      setCurrentConversationId(conv.id);
                      setMode(conv.mode);
                    }}
                    className="w-full text-left px-4 py-3 flex items-center gap-3"
                  >
                    <div
                      className={`p-2 rounded-lg ${
                        conv.mode === "career"
                          ? "bg-blue-600/20"
                          : "bg-purple-600/20"
                      }`}
                    >
                      {conv.mode === "career" ? (
                        <Briefcase className="w-4 h-4" />
                      ) : (
                        <Sparkles className="w-4 h-4" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {conv.title}
                      </p>
                      <p className="text-xs text-slate-400">
                        {conv.messages.length} messages
                      </p>
                    </div>
                  </button>
                  <button
                    onClick={() => deleteConversation(conv.id)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-500/20 text-red-400 transition-all duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col">
        <header className="border-b border-white/10 bg-slate-900/30 backdrop-blur-xl">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-xl hover:bg-white/10 transition-all duration-200"
              >
                {sidebarOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
              <div className="flex gap-2 bg-slate-800/50 p-1.5 rounded-xl backdrop-blur-sm">
                <button
                  onClick={() => switchMode("career")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    mode === "career"
                      ? "bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg shadow-blue-500/50"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Briefcase className="w-4 h-4" />
                  <span className="font-medium">Career</span>
                </button>
                <button
                  onClick={() => switchMode("kanka")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    mode === "kanka"
                      ? "bg-gradient-to-r from-purple-600 to-purple-500 shadow-lg shadow-purple-500/50"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span className="font-medium">Kanka</span>
                </button>
              </div>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {mode === "career" ? "AI Career Q/A" : "Yapay Zeka Kanka 🤖"}
            </h1>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-4 animate-fadeIn ${
                  msg.role === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 shadow-lg ${
                    msg.role === "user"
                      ? "bg-gradient-to-br from-slate-700 to-slate-600"
                      : mode === "career"
                      ? "bg-gradient-to-br from-blue-600 to-blue-500 shadow-blue-500/50"
                      : "bg-gradient-to-br from-purple-600 to-purple-500 shadow-purple-500/50"
                  }`}
                >
                  {msg.role === "user" ? "U" : "AI"}
                </div>
                <div
                  className={`group relative px-5 py-4 rounded-2xl max-w-[75%] backdrop-blur-sm ${
                    msg.role === "user"
                      ? "bg-gradient-to-br from-slate-700/50 to-slate-600/50 border border-white/10"
                      : "bg-gradient-to-br from-slate-800/50 to-slate-700/50 border border-white/10"
                  }`}
                >
                  <MessageContent content={msg.content} />
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-start gap-4 animate-fadeIn">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg ${
                    mode === "career"
                      ? "bg-gradient-to-br from-blue-600 to-blue-500 shadow-blue-500/50"
                      : "bg-gradient-to-br from-purple-600 to-purple-500 shadow-purple-500/50"
                  }`}
                >
                  <Loader2 className="w-5 h-5 animate-spin" />
                </div>
                <div className="px-5 py-4 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-700/50 border border-white/10 backdrop-blur-sm">
                  <span className="text-sm text-slate-400">
                    {mode === "career"
                      ? "Thinking..."
                      : "Düşünüyorum sabretsene biraz 🤔"}
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <div className="border-t border-white/10 bg-slate-900/30 backdrop-blur-xl p-4">
          <div className="max-w-4xl mx-auto flex items-center gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && !e.shiftKey && sendMessage(input)
              }
              disabled={loading}
              placeholder={
                mode === "career"
                  ? "Type your question..."
                  : "Bir şeyler yaz, konuşalım la gardaş sıkıldım 😊"
              }
              className="flex-1 bg-slate-800/50 border border-white/10 rounded-xl px-5 py-3.5 outline-none focus:border-white/30 transition-all duration-200 placeholder-slate-500 disabled:opacity-50"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={loading || !input.trim()}
              className={`group relative overflow-hidden p-3.5 rounded-xl transition-all duration-300 shadow-lg disabled:opacity-50 ${
                mode === "career"
                  ? "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 shadow-blue-500/50"
                  : "bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 shadow-purple-500/50"
              }`}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin relative z-10" />
              ) : (
                <Send className="w-5 h-5 relative z-10" />
              )}
            </button>
          </div>
        </div>
      </main>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
