"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    if (!supabase) {
      setError("Supabase is not connected.");
      setLoading(false);
      return;
    }

    const { error } = await supabase
      .from("contact_messages")
      .insert({
        name,
        email,
        phone,
        message,
      });

    if (error) {
      setError(error.message);
    } else {
      setSuccess("Thank you! Your message has been sent.");

      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    }

    setLoading(false);
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="tel"
        placeholder="Your phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <textarea
        placeholder="Your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        rows={5}
      />

      <button
        type="submit"
        className="contact-submit"
        disabled={loading}
      >
        {loading ? "Sending..." : "Send message"}
      </button>

      {success && (
        <p className="contact-success">{success}</p>
      )}

      {error && (
        <p className="contact-error">{error}</p>
      )}
    </form>
  );
}