import React from "react";
import { Navbar } from "./Navbar";
import LoginCard from "./LoginCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { 
  ShieldCheck, 
  Stethoscope, 
  CalendarCheck, 
  Activity, 
  Users, 
  Award,
  ArrowRight,
  HeartPulse
} from "lucide-react";

export default function LoginPage() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col relative overflow-hidden font-sans">
      {/* Dynamic Background Glow Elements */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-teal-500/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[350px] h-[350px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Top Navbar */}
      <Navbar />

      {/* Main Hero & Auth Section */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 flex flex-col lg:flex-row items-center justify-between gap-12 z-10">
        
        {/* Left Column: Brand Hero & Value Proposition */}
        <div className="w-full lg:w-1/2 space-y-8 text-left">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-950/80 border border-teal-500/30 text-teal-300 text-xs sm:text-sm font-medium backdrop-blur-md shadow-lg shadow-teal-950/50">
            <HeartPulse className="w-4 h-4 text-teal-400 animate-pulse" />
            <span>Next-Gen Healthcare Management System</span>
          </div>

          {/* Heading */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
              Healthcare <br />
              <span className="bg-gradient-to-r from-teal-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent">
                Simplified & Trusted.
              </span>
            </h1>
            <p className="text-slate-400 text-base sm:text-lg max-w-xl leading-relaxed">
              Connect with top-rated medical specialists, manage appointments effortlessly, and access comprehensive care records in one secure platform.
            </p>
          </div>

          {/* Feature Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md flex items-start gap-3.5 hover:border-teal-500/30 transition-colors">
              <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-200">Verified Specialists</h4>
                <p className="text-xs text-slate-400 mt-0.5">Top qualified doctors ready for online and in-clinic consultation.</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md flex items-start gap-3.5 hover:border-teal-500/30 transition-colors">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <CalendarCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-200">Instant Booking</h4>
                <p className="text-xs text-slate-400 mt-0.5">Real-time schedule availability and appointment confirmation.</p>
              </div>
            </div>
          </div>

          {/* Social Proof & Metrics */}
          <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-8 text-slate-400">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-teal-400" />
              <div>
                <div className="text-lg font-bold text-white leading-none">25,000+</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Patients Served</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-400" />
              <div>
                <div className="text-lg font-bold text-white leading-none">99.8%</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Patient Satisfaction</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-cyan-400" />
              <div>
                <div className="text-lg font-bold text-white leading-none">24/7</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Medical Support</div>
              </div>
            </div>
          </div>

          {/* Logged in quick action if user is already authenticated */}
          {currentUser && (
            <div className="p-4 rounded-2xl bg-teal-950/40 border border-teal-500/30 backdrop-blur-md flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-teal-400 uppercase tracking-wider">Active Session</div>
                <div className="text-sm font-bold text-white">Signed in as {currentUser.name || currentUser.email}</div>
              </div>
              <button
                onClick={() => {
                  if (currentUser.role === "doctor") navigate(`/doctorControls/${currentUser.id}`);
                  else navigate('/home');
                }}
                className="py-2 px-4 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-2 transition-all"
              >
                Go to Dashboard
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

        </div>

        {/* Right Column: Login Card */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <LoginCard />
        </div>

      </main>

      {/* Footer copyright bar */}
      <footer className="w-full py-4 text-center text-xs text-slate-500 border-t border-slate-900 z-10">
        © {new Date().getFullYear()} MediTrust Health Platform. All rights reserved.
      </footer>
    </div>
  );
}