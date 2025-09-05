"use client";
import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {open && (
        <div className="w-[380px] h-[560px] bg-white rounded-2xl shadow-lg border overflow-hidden mb-2 flex flex-col">
          <div className="flex items-center justify-between px-3 py-2 bg-gray-100 border-b">
            <span className="font-semibold text-sm">Chat</span>
            <button onClick={() => setOpen(false)}>
              <X size={18} />
            </button>
          </div>
          <iframe
            src="/api/n8n-chat"
            className="flex-1 min-h-0 w-full border-0"
          />
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition"
      >
        <MessageCircle size={22} />
      </button>
    </div>
  );
}
