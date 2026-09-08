import React, { useState } from "react";
import { message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { PostAppointment } from "../../apiCalls/AppointmentsCalls";
import { Navbar } from "../commonComponents/Navbar";
import moment from "moment";
import { Calendar, Clock, CheckCircle, Loader2, ArrowLeft, ShieldCheck } from "lucide-react";

export default function PostingPage() {
  const { date, doctid, userid, time } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const appointmentData = {
    appointmentTime: time,
    appointmentDate: date,
    docter: parseInt(doctid),
    user: parseInt(userid),
  };

  async function handleBookAppointment() {
    setLoading(true);
    try {
      await PostAppointment(appointmentData);
      message.success("Slot booked! It will appear on your homepage.");
      navigate(`/doctor/${doctid}/${date}`);
    } catch (err) {
      console.error(err);
      message.error(err.response?.data?.message || "Failed to book appointment. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans relative overflow-x-hidden">
      <Navbar />

      {/* Ambient Light Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[140px] pointer-events-none" />

      <main className="flex-1 max-w-xl w-full mx-auto px-4 py-12 flex flex-col items-center justify-center z-10">
        
        {/* Back Button */}
        <div className="w-full mb-6 text-left">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 text-xs text-teal-400 hover:text-teal-300 font-semibold cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Slots
          </button>
        </div>

        {/* Confirmation Glass Card */}
        <div className="w-full p-8 rounded-3xl bg-slate-900/90 border border-slate-800/80 backdrop-blur-xl shadow-2xl space-y-6 text-center relative overflow-hidden">
          
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-500 via-emerald-400 to-cyan-500" />

          <div className="w-16 h-16 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-teal-400 flex items-center justify-center mx-auto shadow-lg shadow-teal-500/10">
            <CheckCircle className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              <span>Instant Appointment Reservation</span>
            </div>
            <h2 className="text-2xl font-black text-white">Confirm Your Booking</h2>
            <p className="text-xs text-slate-400">
              Please review the date & time slot for your consultation before confirming.
            </p>
          </div>

          {/* Time & Date Display Box */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-center gap-2 text-slate-200 text-sm font-bold">
              <Calendar className="w-4 h-4 text-teal-400" />
              <span>{moment(date).format("dddd, MMMM Do YYYY")}</span>
            </div>

            <div className="flex items-center justify-center gap-2 text-slate-200 text-sm font-bold">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>{moment(time, "HH:mm:ss").format("hh:mm A")}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 space-y-3">
            <button
              onClick={handleBookAppointment}
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-extrabold text-sm shadow-xl shadow-teal-500/25 flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-60 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Reserving Slot...</span>
                </>
              ) : (
                <span>Confirm & Reserve Slot</span>
              )}
            </button>

            <button
              onClick={() => navigate(-1)}
              className="w-full py-2.5 px-4 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors"
            >
              Cancel
            </button>
          </div>

        </div>
      </main>

      <footer className="w-full py-6 text-center text-xs text-slate-500 border-t border-slate-900 mt-12 z-10">
        © {new Date().getFullYear()} MediTrust Health Platform. All rights reserved.
      </footer>
    </div>
  );
}