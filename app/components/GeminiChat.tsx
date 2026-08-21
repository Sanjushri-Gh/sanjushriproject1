"use client";

import { useState } from "react";

const questions = [
  "What does Sanjushri Foundation do?",
  "Who does the Foundation help?",
  "How can I volunteer?",
  "How can I donate?",
  "Where is the Foundation located?",
  "How can I contact the Foundation?",
];

export default function GeminiChat() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  async function askAI(question: string) {
    if (loading) return;

    setMessage(question);
    setReply("");
    setLoading(true);

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: question }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const reader = response.body?.getReader();

      if (!reader) {
        throw new Error("No response");
      }

      const decoder = new TextDecoder();
      let result = "";

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

      result += decoder.decode(value, { stream: true });

const cleanText = result
  .replace(/\*\*\*/g, "")
  .replace(/\*\*/g, "")
  .replace(/__/g, "")
  .replace(/^\s*#+\s*/gm, "")
  .replace(/`/g, "");

setReply(cleanText);
      }
    } catch (error) {
      console.error(error);
      setReply(
        "Sorry, I couldn't respond right now. Please contact us at admin@sanjushrifoundation.org."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* ALWAYS VISIBLE BUTTON */}
      <button
      className="sf-chat-button"
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          right: "24px",
          bottom: "24px",
          zIndex: 999999,
          width: "64px",
          height: "64px",
          borderRadius: "50%",
          border: "none",
          background: "#123d35",
          color: "white",
          fontSize: "28px",
          cursor: "pointer",
          boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
        }}
      >
        {open ? "×" : "✦"}
      </button>

      {/* CHAT WINDOW */}
      {open && (
        <div
         className="sf-chat-window"
          style={{
            position: "fixed",
            right: "24px",
            bottom: "100px",
            zIndex: 999998,
            width: "380px",
            maxWidth: "calc(100vw - 32px)",
            maxHeight: "70vh",
            overflow: "hidden",
            borderRadius: "24px",
            background: "#fffdf8",
            border: "1px solid #ddd",
            boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
          }}
        >
          {/* HEADER */}
          <div
            style={{
              padding: "18px 20px",
              background: "#123d35",
              color: "white",
            }}
          >
            <div style={{ fontSize: "20px", fontWeight: 600 }}>
              ✨ Sanjushri AI
            </div>

            <div
              style={{
                marginTop: "4px",
                fontSize: "12px",
                opacity: 0.75,
              }}
            >
              Sanjushri Foundation assistant
            </div>
          </div>

          {/* CONTENT */}
          <div
            style={{
              padding: "18px",
              maxHeight: "50vh",
              overflowY: "auto",
            }}
          >
            {!message && (
              <div style={{ marginBottom: "18px" }}>
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: 600,
                    color: "#173f36",
                  }}
                >
                  What would you like to know?
                </div>

                <div
                  style={{
                    marginTop: "6px",
                    fontSize: "14px",
                    lineHeight: 1.5,
                    color: "#666",
                  }}
                >
                  Choose a question below, or type your own question.
                </div>
              </div>
            )}

            {message && (
              <div
                style={{
                  marginBottom: "12px",
                  padding: "12px",
                  borderRadius: "14px",
                  background: "#123d35",
                  color: "white",
                  fontSize: "14px",
                }}
              >
                {message}
              </div>
            )}

            {loading && (
              <div
                style={{
                  marginBottom: "12px",
                  padding: "12px",
                  borderRadius: "14px",
                  background: "#f1f1ee",
                  color: "#173f36",
                  fontSize: "14px",
                }}
              >
                ✨ Thinking...
              </div>
            )}

            {reply && (
              <div
                style={{
                  marginBottom: "16px",
                  padding: "14px",
                  borderRadius: "14px",
                  background: "#f1f1ee",
                  color: "#173f36",
                  fontSize: "14px",
                  lineHeight: 1.6,
                  whiteSpace: "pre-wrap",
                }}
              >
                <div className="sf-typing">
  <span></span>
  <span></span>
  <span></span>
</div>
                {reply}
              </div>
            )}

            <div
              style={{
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "1px",
                color: "#888",
                marginBottom: "10px",
                textTransform: "uppercase",
              }}
            >
              Popular questions
            </div>

            {questions.map((question) => (
              <button
              className="chat-question"
                key={question}
                onClick={() => askAI(question)}
                disabled={loading}
                style={{
                  display: "block",
                  width: "100%",
                  marginBottom: "8px",
                  padding: "11px 13px",
                  borderRadius: "12px",
                  border: "1px solid #ddd",
                  background: "white",
                  color: "#173f36",
                  textAlign: "left",
                  cursor: loading ? "not-allowed" : "pointer",
                  fontSize: "13px",
                  opacity: loading ? 0.5 : 1,
                }}
              >
                {question}
              </button>
            ))}
          </div>

          {/* INPUT */}
          <div
            style={{
              padding: "14px",
              borderTop: "1px solid #ddd",
              background: "white",
            }}
          >
            <div style={{ display: "flex", gap: "8px" }}>
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && message.trim()) {
                    askAI(message);
                  }
                }}
                placeholder="Ask something..."
                disabled={loading}
                style={{
                  flex: 1,
                  minWidth: 0,
                  padding: "11px",
                  borderRadius: "12px",
                  border: "1px solid #ddd",
                  outline: "none",
                  fontSize: "13px",
                }}
              />

              <button
                onClick={() => {
                  if (message.trim()) {
                    askAI(message);
                  }
                }}
                disabled={loading || !message.trim()}
                style={{
                  padding: "11px 16px",
                  borderRadius: "12px",
                  border: "none",
                  background: "#123d35",
                  color: "white",
                  cursor: "pointer",
                  opacity: loading || !message.trim() ? 0.5 : 1,
                }}
              >
                Ask
              </button>
            </div>

            <div
              style={{
                marginTop: "8px",
                textAlign: "center",
                fontSize: "10px",
                color: "#999",
              }}
            >
              admin@sanjushrifoundation.org
            </div>
          </div>
        </div>
      )}
    </>
  );
}