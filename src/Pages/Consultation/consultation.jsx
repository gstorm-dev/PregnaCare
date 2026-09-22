import React, { useEffect, useMemo, useState } from "react";
import { ArrowLeft, MessageCircle, Send, Smartphone } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getAppointments,
  getChatMessages,
  saveChatMessages,
  updateAppointment,
} from "../../Services/appointments";

const toWhatsAppNumber = (phone) => {
  const digits = String(phone || "").replace(/\D/g, "");
  if (!digits) return "";
  return digits.startsWith("0") ? `234${digits.slice(1)}` : digits;
};

const Consultation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const appointmentId = new URLSearchParams(location.search).get("appointment");
  const currentUser = useMemo(() => {
    try {
      return JSON.parse(sessionStorage.getItem("loggedInUser") || "null");
    } catch {
      return null;
    }
  }, []);
  const appointment = useMemo(
    () => getAppointments().find((item) => item.id === appointmentId),
    [appointmentId],
  );
  const [messages, setMessages] = useState(() =>
    appointmentId ? getChatMessages(appointmentId) : [],
  );
  const [draft, setDraft] = useState("");

  useEffect(() => {
    if (!appointmentId) return undefined;

    const syncMessages = () => setMessages(getChatMessages(appointmentId));
    syncMessages();
    window.addEventListener("pregnacare:chat-updated", syncMessages);
    window.addEventListener("storage", syncMessages);

    if (currentUser?.role === "doctor" && appointment) {
      updateAppointment(appointmentId, {
        consultationStarted: true,
        consultationStartedAt:
          appointment.consultationStartedAt || new Date().toISOString(),
      });
    }

    return () => {
      window.removeEventListener("pregnacare:chat-updated", syncMessages);
      window.removeEventListener("storage", syncMessages);
    };
  }, [appointmentId, appointment, currentUser?.role]);

  const sendMessage = (event) => {
    event.preventDefault();
    const text = draft.trim();
    if (!text || !appointmentId) return;

    const nextMessages = [
      ...getChatMessages(appointmentId),
      {
        id: `message-${Date.now()}`,
        sender: currentUser?.name || "User",
        senderRole: currentUser?.role || "patient",
        text,
        sentAt: new Date().toISOString(),
      },
    ];
    saveChatMessages(appointmentId, nextMessages);
    setMessages(nextMessages);
    setDraft("");
  };

  const whatsappNumber =
    currentUser?.role === "patient"
      ? toWhatsAppNumber(
          appointment?.doctorPhone ||
            (() => {
              try {
                const doctor = JSON.parse(
                  localStorage.getItem("doctorUser") || "null",
                );
                return doctor?.email === appointment?.doctorEmail
                  ? doctor.phone || doctor.contactInfo
                  : "";
              } catch {
                return "";
              }
            })(),
        )
      : "";
  const whatsappUrl = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello, I would like to discuss my PregnaCare appointment.")}`
    : "";

  return (
    <main className="min-h-screen bg-[#f8f6f3] p-4 text-[#26322e] sm:p-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 pb-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d98268] text-white">
            <MessageCircle size={20} />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#c87861]">
              PregnaCare
            </p>
            <h1 className="font-serif text-xl">Care chat</h1>
          </div>
        </div>
        <button
          type="button"
          onClick={() =>
            navigate(currentUser?.role === "doctor" ? "/doctor" : "/patient")
          }
          className="inline-flex items-center gap-2 rounded-xl border border-[#e9e2dc] bg-white px-4 py-2 text-sm font-semibold transition hover:bg-[#fff0ea]"
        >
          <ArrowLeft size={17} /> Back to dashboard
        </button>
      </div>

      <section className="mx-auto grid max-w-4xl gap-5 lg:grid-cols-[1fr_260px]">
        <div className="flex min-h-[620px] flex-col rounded-2xl border border-[#eadfd9] bg-white shadow-[0_10px_30px_rgba(125,79,62,.05)]">
          <div className="border-b border-[#eee6e0] p-5">
            <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#c87861]">
              Appointment chat
            </p>
            <h2 className="mt-1 font-serif text-2xl">
              {appointment?.patientName || "PregnaCare care team"}
            </h2>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-5">
            {messages.length === 0 ? (
              <p className="py-16 text-center text-sm text-[#69736f]">
                Start the conversation with a message about this appointment.
              </p>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.senderRole === currentUser?.role ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${message.senderRole === currentUser?.role ? "bg-[#d98268] text-white" : "bg-[#fff0ea] text-[#3b4944]"}`}>
                    <p className="mb-1 text-xs font-semibold opacity-70">{message.sender}</p>
                    <p>{message.text}</p>
                  </div>
                </div>
              ))
            )}
          </div>
          <form onSubmit={sendMessage} className="flex gap-3 border-t border-[#eee6e0] p-4">
            <input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Write a message..."
              className="min-w-0 flex-1 rounded-xl border border-[#e9e2dc] bg-[#fffdfb] px-4 py-3 text-sm outline-none focus:border-[#d98268]"
            />
            <button
              type="submit"
              aria-label="Send message"
              className="rounded-xl bg-[#d98268] px-4 text-white transition hover:bg-[#c66f57]"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
        <aside className="h-fit rounded-2xl border border-[#eadfd9] bg-white p-5 shadow-[0_10px_30px_rgba(125,79,62,.05)]">
          <p className="text-sm font-semibold">Need WhatsApp?</p>
          <p className="mt-2 text-sm leading-6 text-[#69736f]">
            Continue this appointment conversation securely through WhatsApp.
          </p>
          {whatsappUrl ? (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25d366] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#1db954]"
            >
              <Smartphone size={17} /> Message on WhatsApp
            </a>
          ) : (
            <p className="mt-4 rounded-xl bg-[#fff8f4] p-3 text-xs text-[#69736f]">
              No WhatsApp number is available for this doctor yet.
            </p>
          )}
        </aside>
      </section>
    </main>
  );
};

export default Consultation;
