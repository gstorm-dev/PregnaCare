import { ArrowLeft, Video } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const Consultation = () => {
  const { roomName } = useParams();
  const safeRoomName = roomName || "pregnacare-consultation";

  return (
    <main className="min-h-screen bg-[#26322e] p-4 text-white sm:p-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 pb-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d98268]">
            <Video size={20} />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#f2c8b8]">
              PregnaCare
            </p>
            <h1 className="font-serif text-xl">Video consultation</h1>
          </div>
        </div>
        <Link
          to="/doctor"
          className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2 text-sm font-semibold transition hover:bg-white/10"
        >
          <ArrowLeft size={17} /> Back to dashboard
        </Link>
      </div>

      <section className="mx-auto max-w-7xl overflow-hidden rounded-2xl bg-black shadow-2xl">
        <iframe
          title="Jitsi video consultation"
          src={`https://meet.jit.si/${encodeURIComponent(safeRoomName)}#config.prejoinPageEnabled=true`}
          allow="camera; microphone; fullscreen; display-capture; autoplay"
          className="h-[calc(100vh-8.5rem)] min-h-[520px] w-full border-0"
        />
      </section>
    </main>
  );
};

export default Consultation;
