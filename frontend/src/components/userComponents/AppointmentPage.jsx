import React, { useState } from "react";
import { message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { PostAppointment } from "../../apiCalls/AppointmentsCalls";
import { Navbar } from "../commonComponents/Navbar";
import moment from "moment";
import { Calendar, Clock, CheckCircle, Loader2, ArrowLeft, ShieldCheck } from "lucide-react";

export default function AppointmentPage() {
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
      message.success("Appointment successfully confirmed.");
      navigate(`/doctor/${doctid}/${date}`);
    } catch (err) {
      console.error(err);
      message.error(err.response?.data?.message || "Failed to confirm appointment. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-xl w-full mx-auto px-4 py-12 flex flex-col items-center justify-center">
        <div className="w-full mb-5 text-left">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 text-xs text-teal-400 hover:text-teal-300 font-semibold cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Slots
          </button>
        </div>

        <div className="w-full p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 text-center">
          <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center mx-auto">
            <CheckCircle className="w-6 h-6" />
          </div>

          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-800 text-teal-400 text-xs font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              <span>Direct Booking Confirmation</span>
            </div>
            <h2 className="text-xl font-bold text-white">Review & Confirm Appointment</h2>
            <p className="text-xs text-slate-400">
              Please check your chosen date and scheduled time before confirming.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5 text-sm">
            <div className="flex items-center justify-center gap-2 text-slate-200 font-medium">
              <Calendar className="w-4 h-4 text-teal-400" />
              <span>{moment(date).format("dddd, MMMM Do YYYY")}</span>
            </div>

            <div className="flex items-center justify-center gap-2 text-slate-200 font-medium">
              <Clock className="w-4 h-4 text-teal-400" />
              <span>{moment(time, "HH:mm:ss").format("hh:mm A")}</span>
            </div>
          </div>

          <div className="pt-2 space-y-2.5">
            <button
              onClick={handleBookAppointment}
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Confirming Slot...</span>
                </>
              ) : (
                <span>Confirm Appointment</span>
              )}
            </button>

            <button
              onClick={() => navigate(-1)}
              className="w-full py-2 px-4 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      </main>

      <footer className="w-full py-5 text-center text-xs text-slate-500 border-t border-slate-900 mt-12">
        © {new Date().getFullYear()} MediTrust Health Network.
      </footer>
    </div>
  );
}
