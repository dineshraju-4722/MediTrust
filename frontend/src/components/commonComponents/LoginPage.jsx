import React from "react";
import { Navbar } from "./Navbar";
import LoginCard from "./LoginCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { 
  Building2, 
  Stethoscope, 
  CalendarCheck, 
  CheckCircle,
  ArrowRight,
  Shield
} from "lucide-react";

export default function LoginPage() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="w-full lg:w-1/2 space-y-8 text-left">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-teal-400 text-xs font-semibold">
            <Shield className="w-4 h-4 text-teal-400" />
            <span>Verified Healthcare Network</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Direct access to trusted specialists and hospital care.
            </h1>
            <p className="text-slate-400 text-base sm:text-lg max-w-xl leading-relaxed">
              Find verified doctors across accredited hospitals, check real-time availability, and secure your appointment slot with complete transparency.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/20 shrink-0">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-200">Verified Specialists</h4>
                <p className="text-xs text-slate-400 mt-1">Board-certified physicians and specialists categorized by clinical field.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/20 shrink-0">
                <CalendarCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-200">Live Availability</h4>
                <p className="text-xs text-slate-400 mt-1">Direct slot scheduling synced with hospital doctor schedules.</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/80 grid grid-cols-3 gap-6 text-slate-400">
            <div>
              <div className="text-xl font-bold text-white">10+</div>
              <div className="text-xs text-slate-400 mt-0.5">Specialties</div>
            </div>
            <div>
              <div className="text-xl font-bold text-white">Partner</div>
              <div className="text-xs text-slate-400 mt-0.5">Hospitals & Clinics</div>
            </div>
            <div>
              <div className="text-xl font-bold text-white">Direct</div>
              <div className="text-xs text-slate-400 mt-0.5">Slot Reservation</div>
            </div>
          </div>

          {currentUser && (
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-xs text-teal-400 font-semibold uppercase tracking-wider">Active Session</div>
                <div className="text-sm font-bold text-white">Signed in as {currentUser.name || currentUser.email}</div>
              </div>
              <button
                onClick={() => {
                  if (currentUser.role === "doctor") navigate(`/doctorControls/${currentUser.id}`);
                  else navigate("/home");
                }}
                className="py-2 px-4 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                Go to Dashboard
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

        </div>

        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <LoginCard />
        </div>
      </main>

      <footer className="w-full py-5 text-center text-xs text-slate-500 border-t border-slate-900">
        © {new Date().getFullYear()} MediTrust Health Network. Clinical transparency and patient-first care.
      </footer>
    </div>
  );
}
