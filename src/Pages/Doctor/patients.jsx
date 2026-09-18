import { ChevronRight, Search } from "lucide-react";

const Patients = ({
  view,
  setActiveView,
  patientQuery,
  setPatientQuery,
  filteredPatients,
  pendingPatients,
  handlePendingPatientDecision,
}) => {
  if (view === "pendingPatients")
    return (
      <section>
        <SectionHeading
          eyebrow="Access requests"
          title="Pending patient requests"
          text="Review patient requests and decide who to accept into your care list."
        />
        <div className="grid gap-4 lg:grid-cols-2">
          {pendingPatients.length === 0 ? (
            <Empty text="When a patient requests care, they will appear here for review." />
          ) : (
            pendingPatients.map((request) => (
              <article
                key={request.id}
                className="rounded-2xl border border-[#eadfd9] bg-white p-5 shadow-[0_10px_30px_rgba(125,79,62,.05)]"
              >
                <h3 className="font-serif text-2xl">{request.name}</h3>
                <p className="mt-1 text-sm text-[#69736f]">Age {request.age}</p>
                <p className="mt-4 text-sm text-[#69736f]">
                  <b>Request:</b> {request.reason}
                </p>
                <p className="mt-2 text-sm text-[#69736f]">
                  <b>Requested:</b> {request.requestedAt}
                </p>
                <div className="mt-5 flex gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      handlePendingPatientDecision(request.id, "accept")
                    }
                    className="flex-1 rounded-xl bg-[#d98268] px-4 py-2.5 text-sm font-semibold text-white"
                  >
                    Accept
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handlePendingPatientDecision(request.id, "decline")
                    }
                    className="flex-1 rounded-xl border border-[#e9d4cc] bg-[#fffaf8] px-4 py-2.5 text-sm font-semibold text-[#8b645c]"
                  >
                    Decline
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    );
  return (
    <section>
      <SectionHeading
        eyebrow="Care team"
        title="Patient overview"
        text="Stay on top of follow-ups, consultations, and routine monitoring."
      />
      <div className="rounded-2xl border border-[#eadfd9] bg-white p-5 shadow-[0_10px_30px_rgba(125,79,62,.05)]">
        {filteredPatients.length === 0 ? (
          <Empty
            text="Once you accept a patient request, they will appear here."
            action={() => setActiveView("pendingPatients")}
          />
        ) : (
          <>
            <div className="mb-5 flex items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search
                  size={18}
                  className="absolute left-4 top-3.5 text-[#9aa09c]"
                />
                <input
                  value={patientQuery}
                  onChange={(event) => setPatientQuery(event.target.value)}
                  placeholder="Search patients, conditions, or visit status"
                  className="w-full rounded-xl border border-[#e9e2dc] bg-[#fffdfb] py-3 pl-11 pr-4 text-sm outline-none focus:border-[#d98268]"
                />
              </div>
              <button
                type="button"
                onClick={() => setActiveView("pendingPatients")}
                className="rounded-xl bg-[#d98268] px-4 py-3 text-sm font-semibold text-white"
              >
                Pending requests
              </button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {filteredPatients.map((patient) => (
                <article
                  key={`${patient.name}-${patient.visit}`}
                  className="rounded-2xl border border-[#eadfd9] bg-[#fffdfb] p-4 shadow-sm"
                >
                  <h3 className="font-serif text-xl">{patient.name}</h3>
                  <p className="mt-1 text-sm text-[#69736f]">
                    Age {patient.age}
                  </p>
                  <p className="mt-4 text-sm text-[#69736f]">
                    <b>Condition:</b> {patient.condition}
                  </p>
                  <p className="mt-2 text-sm text-[#69736f]">
                    <b>Visit:</b> {patient.visit}
                  </p>
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};
const Empty = ({ text, action }) => (
  <div className="col-span-full rounded-2xl border border-dashed border-[#e9d4cc] bg-[#fffaf8] p-8 text-center">
    <p className="font-serif text-3xl text-[#26322e]">No patients yet</p>
    <p className="mt-3 text-sm text-[#69736f]">{text}</p>
    {action && (
      <button
        type="button"
        onClick={action}
        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#d98268] px-5 py-3 text-sm font-semibold text-white"
      >
        Accept patients <ChevronRight size={16} />
      </button>
    )}
  </div>
);
const SectionHeading = ({ eyebrow, title, text }) => (
  <div className="mb-7">
    <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#c87861]">
      {eyebrow}
    </p>
    <h2 className="mt-2 font-serif text-4xl">{title}</h2>
    <p className="mt-3 max-w-2xl text-sm leading-6 text-[#69736f]">{text}</p>
  </div>
);
export default Patients;
