import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  MdChat as MessageCircle,
  MdClose as X,
  MdCheckroom as Shirt,
  MdSend as Send,
  MdMic as Mic,
  MdImage as ImageIcon,
} from "react-icons/md";
import { GoogleGenerativeAI } from "@google/generative-ai";

// --------------------------------------------------
// GEMINI INIT (Safe)
// --------------------------------------------------
let chatModel = null;
let visionModel = null;
let initError = null;

try {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    initError = "VITE_GEMINI_API_KEY not set in .env";
    console.warn(initError);
  } else {
    const genAI = new GoogleGenerativeAI(apiKey);
    chatModel = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    visionModel = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  }
} catch (err) {
  initError = `Gemini init failed: ${err.message}`;
  console.error(initError, err);
}

// ---------------------------------------------
// CLEAN FORMATTER
// ---------------------------------------------
const cleanText = (str = "") =>
  str
    .replace(/\*/g, "")
    .replace(/_/g, "")
    .replace(/#/g, "")
    .replace(/-/g, "")
    .replace(/\n{2,}/g, "\n")
    .trim();

// --------------------------------------------------
// MAIN CHATBOT COMPONENT
// --------------------------------------------------
const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: initError
        ? `Sorry yaar! ${initError} — StyleSher offline hai 😅`
        : "Hi! I'm StyleSher — your filmy fashion bestie 💖 Outfit tips chahiye? Skin tone matching? Color combo? Bol na!",
      sender: "bot",
      type: "text",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const fileInputRef = useRef(null);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // ---------------------------------------------
  // ADD MESSAGE
  // ---------------------------------------------
  const addMessage = (msg) => {
    setMessages((prev) => [...prev, msg]);
  };

  // ---------------------------------------------
  // SPEECH TO TEXT (Hindi → English)
  // ---------------------------------------------
  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Mic not supported!");
      return;
    }

    const recog = new SpeechRecognition();
    recog.lang = "hi-IN"; // Hindi recognition
    recog.start();

    recog.onresult = async (e) => {
      const hindiText = e.results[0][0].transcript;

      // Translate Hindi → English
      const translated = await chatModel.generateContent(
        `Translate this to casual English ONLY (no punctuation drama): ${hindiText}`
      );

      const english =
        translated?.response?.text?.() ||
        translated?.response?.text ||
        hindiText;

      setInput(english);
    };
  };

  // ---------------------------------------------
  // SEND TEXT MESSAGE (with error logging)
  // ---------------------------------------------
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (!chatModel) {
      addMessage({
        id: Date.now() + "_noapi",
        text: "API key missing! Check .env VITE_GEMINI_API_KEY",
        sender: "bot",
        type: "text",
      });
      return;
    }

    const userMsg = {
      id: Date.now(),
      text: input,
      sender: "user",
      type: "text",
    };
    addMessage(userMsg);
    setInput("");
    setIsTyping(true);

    try {
      const result = await chatModel.generateContent(
        `You are StyleSher, a filmy best friend.

User said: "${userMsg.text}"

Reply in:
- Clean Hinglish
- No markdown
- Fun filmy tone
- 2–4 lines max`
      );

      const reply =
        result?.response?.text?.() || result?.response?.text || "Haan bol?";

      addMessage({
        id: Date.now() + "_bot",
        text: cleanText(reply),
        sender: "bot",
        type: "text",
      });
    } catch (err) {
      console.error("Chat error:", err);
      addMessage({
        id: Date.now() + "_err",
        text: `Error: ${err.message || "Network issue. Retry!"}`,
        sender: "bot",
        type: "text",
      });
    }

    setIsTyping(false);
  };

  // ---------------------------------------------
  // IMAGE UPLOAD HANDLER
  // ---------------------------------------------
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Convert to base64
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result.split(",")[1];

      // Show user image bubble
      addMessage({
        id: Date.now(),
        sender: "user",
        type: "image",
        image: reader.result,
      });

      // Do outfit analysis
      await analyzeOutfit(base64, file);
    };

    reader.readAsDataURL(file);
  };

  // ---------------------------------------------
  // OUTFIT ANALYSIS (with error logging)
  // ---------------------------------------------
  const analyzeOutfit = async (base64, file) => {
    if (!visionModel) {
      addMessage({
        id: Date.now() + "_noapi",
        text: "Vision API not ready. Check API key!",
        sender: "bot",
        type: "text",
      });
      setIsTyping(false);
      return;
    }

    setIsTyping(true);

    try {
      const out = await visionModel.generateContent([
        {
          inlineData: {
            data: base64,
            mimeType: file.type || "image/jpeg",
          },
        },
        `
You are StyleSher — a filmy fashion best friend.

Analyze ONLY the outfit in this exact uploaded image.
Do NOT ask for another photo.
Do NOT say "send again".

Explain:
- Does the color suit their skin tone?
- Fit, vibe, personality match
- Styling improvements
- Small filmy-style compliment
Tone: Hinglish + fun + friendly.
Format: 3–5 clean lines (no *, no -, no markdown).
        `,
      ]);

      const reply =
        out?.response?.text?.() ||
        out?.response?.text ||
        "Kya style hai yaar!";

      addMessage({
        id: Date.now() + "_botimg",
        sender: "bot",
        type: "text",
        text: cleanText(reply),
      });
    } catch (err) {
      console.error("Vision analysis error:", err);
      addMessage({
        id: Date.now() + "_errimg",
        sender: "bot",
        type: "text",
        text: `Image error: ${err.message || "Try again!"}`,
      });
    }

    setIsTyping(false);
  };

  // ---------------------------------------------
  // CHAT UI
  // ---------------------------------------------
  const widget = (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="mb-3 w-[340px] h-[480px] bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col animate-fadeIn">
          <div className="p-3 border-b flex justify-between items-center">
            <h2 className="font-semibold text-sm">StyleSher – Your Filmy Friend</h2>
            <button onClick={() => setIsOpen(false)}>
              <X size={22} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.map((m) =>
              m.type === "image" ? (
                <div key={m.id} className="flex justify-end">
                  <img
                    src={m.image}
                    alt="user upload"
                    className="w-40 rounded-xl shadow-md border"
                  />
                </div>
              ) : (
                <div
                  key={m.id}
                  className={`max-w-[75%] p-2 rounded-lg ${
                    m.sender === "user"
                      ? "ml-auto bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  {m.text}
                </div>
              )
            )}
            {isTyping && (
              <div className="p-2 bg-gray-100 rounded-lg w-fit text-gray-700">
                Typing…
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Input */}
          <form onSubmit={sendMessage} className="p-3 border-t flex items-center gap-2">
            <button
              type="button"
              onClick={startListening}
              className="p-2 bg-gray-200 rounded-full disabled:opacity-50"
              disabled={!chatModel}
            >
              <Mic size={18} />
            </button>

            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="p-2 bg-gray-200 rounded-full disabled:opacity-50"
              disabled={!visionModel}
            >
              <ImageIcon size={18} />
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />

            <input
              className="flex-1 px-3 py-2 border rounded-full text-sm disabled:opacity-50"
              placeholder={
                chatModel
                  ? "Bol na, kya scene hai?"
                  : "API key missing..."
              }
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={!chatModel}
            />

            <button
              className="p-2 bg-rose-500 text-white rounded-full disabled:opacity-50"
              disabled={!chatModel}
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      {/* FAB */}
      <button
        className="h-14 w-14 bg-gradient-to-tr from-rose-500 to-purple-600 text-white rounded-full flex items-center justify-center shadow-xl"
        onClick={() => setIsOpen((p) => !p)}
      >
        <MessageCircle size={26} />
      </button>
    </div>
  );

  return createPortal(widget, document.body);
};

export default Chatbot;
