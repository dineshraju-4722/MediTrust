import React, { useEffect, useState } from "react";
import { Navbar } from "../commonComponents/Navbar";
import { Button, message, Rate } from "antd";
import { getAppoinByDateAndDoctor, getDocter, postreviewcall } from "../../apiCalls/DocterCalls";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";
import { 
  Stethoscope, 
  Award, 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Calendar, 
  Star, 
  ArrowLeft,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

export const DoctorsView = () => {
  const { id, date } = useParams();
  const [docter, setDocter] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [rating, setRating] = useState(0);
  const [ref, setRef] = useState(true);
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();

  function checkingSignIn(dateFunc, doctid, userid, starttime) {
    navigate(`/booking/${dateFunc}/${doctid}/${userid}/${starttime}`);
  }

  async function postreview(newRating, userid, doctid) {
    if (!newRating) {
      message.warning("Please select a star rating first.");
      return;
    }
    const jsonbody = {
      rating: newRating,
      docterid: doctid,
      userid: userid,
    };
    try {
      await postreviewcall(jsonbody);
      setRef(!ref);
      message.success("Thank you! Rating posted successfully.");
    } catch (err) {
      message.error("Failed to post rating.");
    }
  }

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const doctorDetails = await getDocter(id);
        setDocter(doctorDetails);
        const apptList = await getAppoinByDateAndDoctor(id, date);
        if (Array.isArray(apptList)) {
          setAppointments(apptList);
        }
      } catch (err) {
        console.error("Error fetching doctor details:", err);
      }
    };
    fetchDoctorDetails();
  }, [id, date, ref]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans relative overflow-x-hidden">
      <Navbar />

      {/* Ambient Lights */}
      <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[140px] pointer-events-none" />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 z-10">
        
        {/* Back Button */}
        <div>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 text-xs text-teal-400 hover:text-teal-300 font-semibold cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Doctors
          </button>
        </div>

        {docter ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Doctor Profile & Reviews */}
            <div className="lg:col-span-1 p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800/80 backdrop-blur-xl shadow-2xl space-y-6">
              
              {/* Doctor Bio Header */}
              <div className="flex flex-col items-center text-center space-y-3 pb-6 border-b border-slate-800/80">
                <img
                  src={
                    docter.imglink ||
                    "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&auto=format&fit=crop&q=80"
                  }
                  alt={docter.name}
                  className="w-28 h-28 rounded-full object-cover border-4 border-teal-500/30 bg-slate-800 shadow-xl"
                />
                <div>
                  <h2 className="text-2xl font-black text-white">{docter.name}</h2>
                  <div className="text-sm font-semibold text-teal-400 mt-1">
                    {docter.specialization?.name}
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/30 text-xs font-bold flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-emerald-400" />
                  {docter.experience} Years Experience
                </span>
              </div>

              {/* Hospital & Contact Details */}
              <div className="space-y-3 text-xs text-slate-300">
                <div
                  onClick={() => navigate(`/hospital/${docter.hospital?.id}`)}
                  className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-3 hover:border-teal-500/40 cursor-pointer transition-all"
                >
                  <Building2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <div>
                    <div className="font-bold text-white">{docter.hospital?.name}</div>
                    <div className="text-[11px] text-slate-400">{docter.hospital?.location}</div>
                  </div>
                </div>

                {docter.contact && (
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-3">
                    <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{docter.contact}</span>
                  </div>
                )}

                {docter.email && (
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-3">
                    <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                    <span className="truncate">{docter.email}</span>
                  </div>
                )}
              </div>

              {/* Overall Rating & Review Posting */}
              <div className="pt-4 border-t border-slate-800/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Average Rating</span>
                  <span className="text-sm font-extrabold text-amber-400">{docter.averageRating || 4.5} / 5</span>
                </div>
                
                <Rate value={docter.averageRating || 4.5} disabled className="text-amber-400 text-sm" />

                {/* Rating Input Widget */}
                <div className="pt-3 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                  <div className="text-xs font-semibold text-slate-300">
                    {docter.userRating === 0 ? "Rate your experience:" : "Update your rating:"}
                  </div>
                  <Rate value={rating || docter.userRating} onChange={setRating} className="text-amber-400" />
                  
                  <button
                    onClick={() => {
                      if (currentUser) {
                        postreview(rating, currentUser.id, docter.id);
                      } else {
                        message.info("Please sign in to rate this doctor.");
                      }
                    }}
                    className="w-full mt-2 py-2 px-3 bg-slate-800 hover:bg-teal-500 hover:text-slate-950 text-teal-400 font-bold text-xs rounded-xl transition-all cursor-pointer"
                  >
                    Submit Review
                  </button>
                </div>
              </div>

            </div>

            {/* Right Column: Time Slots & Booking */}
            <div className="lg:col-span-2 space-y-6">
              
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800/80 backdrop-blur-xl shadow-2xl space-y-6">
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
                  <div>
                    <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-teal-400" />
                      Available Slots for {moment(date).format("dddd, MMM Do YYYY")}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Select an available time slot to reserve your consultation
                    </p>
                  </div>
                </div>

                {/* Slots List */}
                {appointments.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {appointments.map((ele, idx) => {
                      const isFull = ele.bookedAppointments >= ele.maxAppointments;
                      return (
                        <div
                          key={idx}
                          onClick={() => {
                            if (isFull) {
                              message.warning("This slot is fully booked.");
                              return;
                            }
                            if (currentUser) {
                              checkingSignIn(date, docter.id, currentUser.id, ele.startTime);
                            } else {
                              message.info("Please sign in to book an appointment.");
                            }
                          }}
                          className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-4 ${
                            isFull
                              ? "bg-slate-950/40 border-slate-800 text-slate-500 cursor-not-allowed"
                              : "bg-slate-950/80 border-slate-800 hover:border-teal-500/60 hover:bg-slate-900 shadow-lg"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-white font-bold text-base">
                              <Clock className="w-4 h-4 text-teal-400" />
                              <span>
                                {moment(ele.startTime, "HH:mm").format("hh:mm A")} -{" "}
                                {moment(ele.endTime, "HH:mm:ss").format("hh:mm A")}
                              </span>
                            </div>

                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                                isFull
                                  ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                                  : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              }`}
                            >
                              {isFull ? "Fully Booked" : "Available"}
                            </span>
                          </div>

                          <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/60">
                            <span>Capacity:</span>
                            <span className="font-semibold text-slate-200">
                              {ele.bookedAppointments} / {ele.maxAppointments} Booked
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-12 text-center space-y-3 bg-slate-950/50 rounded-2xl border border-slate-800">
                    <AlertCircle className="w-10 h-10 text-amber-400 mx-auto" />
                    <div className="text-sm font-bold text-slate-300">No Slots Released For This Date</div>
                    <p className="text-xs text-slate-500">
                      The doctor has not posted availability for {moment(date).format("MMM Do YYYY")} yet.
                    </p>
                  </div>
                )}

              </div>

            </div>

          </div>
        ) : (
          <div className="text-center py-16 text-slate-400 space-y-3">
            <div className="w-8 h-8 border-2 border-teal-400 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm">Loading doctor profile & slots...</p>
          </div>
        )}
      </main>

      <footer className="w-full py-6 text-center text-xs text-slate-500 border-t border-slate-900 mt-12 z-10">
        © {new Date().getFullYear()} MediTrust Health Platform. All rights reserved.
      </footer>
    </div>
  );
};