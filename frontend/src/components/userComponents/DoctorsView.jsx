import React, { useEffect, useState } from "react";
import { Navbar } from "../commonComponents/Navbar";
import { message, Rate } from "antd";
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
  ArrowLeft,
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
      message.success("Thank you for your feedback.");
    } catch {
      message.error("Failed to submit rating.");
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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
              <div className="flex flex-col items-center text-center space-y-3 pb-5 border-b border-slate-800">
                {docter.imglink ? (
                  <img
                    src={docter.imglink}
                    alt={docter.name}
                    className="w-24 h-24 rounded-full object-cover border-2 border-slate-700 bg-slate-800"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-teal-400">
                    <Stethoscope className="w-10 h-10" />
                  </div>
                )}
                <div>
                  <h2 className="text-xl font-bold text-white">{docter.name}</h2>
                  <div className="text-xs font-semibold text-teal-400 mt-0.5">
                    {docter.specialization?.name}
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-medium flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-emerald-400" />
                  {docter.experience || "Experienced"}
                </span>
              </div>

              <div className="space-y-2.5 text-xs text-slate-300">
                <div
                  onClick={() => navigate(`/hospital/${docter.hospital?.id}`)}
                  className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-3 hover:border-slate-700 cursor-pointer transition-colors"
                >
                  <Building2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <div>
                    <div className="font-semibold text-white">{docter.hospital?.name}</div>
                    <div className="text-[11px] text-slate-400">{docter.hospital?.location}</div>
                  </div>
                </div>

                {docter.contact && (
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-3">
                    <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>{docter.contact}</span>
                  </div>
                )}

                {docter.email && (
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-3">
                    <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="truncate">{docter.email}</span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-400">Patient Rating</span>
                  <span className="text-xs font-bold text-amber-400">
                    {docter.averageRating ? docter.averageRating.toFixed(1) : "4.5"} / 5
                  </span>
                </div>
                
                <Rate value={docter.averageRating || 4.5} disabled className="text-amber-400 text-sm" />

                <div className="pt-2 p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="text-xs text-slate-300">
                    {docter.userRating === 0 ? "Rate your consultation:" : "Update your rating:"}
                  </div>
                  <Rate value={rating || docter.userRating} onChange={setRating} className="text-amber-400" />
                  
                  <button
                    onClick={() => {
                      if (currentUser) {
                        postreview(rating, currentUser.id, docter.id);
                      } else {
                        message.info("Please sign in to submit a rating.");
                      }
                    }}
                    className="w-full mt-2 py-1.5 px-3 bg-slate-800 hover:bg-teal-500 hover:text-slate-950 text-teal-400 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                  >
                    Submit Rating
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-5">
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
                <div className="border-b border-slate-800 pb-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-teal-400" />
                    Available Slots for {moment(date).format("dddd, MMM Do YYYY")}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Select an open consultation window below to reserve your appointment.
                  </p>
                </div>

                {appointments.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {appointments.map((ele, idx) => {
                      const isFull = ele.bookedAppointments >= ele.maxAppointments;
                      return (
                        <div
                          key={idx}
                          onClick={() => {
                            if (isFull) {
                              message.warning("This slot has reached full capacity.");
                              return;
                            }
                            if (currentUser) {
                              checkingSignIn(date, docter.id, currentUser.id, ele.startTime);
                            } else {
                              message.info("Please sign in to book an appointment.");
                            }
                          }}
                          className={`p-4 rounded-xl border transition-colors cursor-pointer flex flex-col justify-between gap-3 ${
                            isFull
                              ? "bg-slate-950/40 border-slate-800 text-slate-500 cursor-not-allowed"
                              : "bg-slate-950 border-slate-800 hover:border-teal-500/50 hover:bg-slate-950/80"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-white font-semibold text-sm">
                              <Clock className="w-4 h-4 text-teal-400" />
                              <span>
                                {moment(ele.startTime, "HH:mm").format("hh:mm A")} -{" "}
                                {moment(ele.endTime, "HH:mm:ss").format("hh:mm A")}
                              </span>
                            </div>

                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                                isFull
                                  ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                                  : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              }`}
                            >
                              {isFull ? "Full" : "Open"}
                            </span>
                          </div>

                          <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
                            <span>Capacity:</span>
                            <span className="font-medium text-slate-200">
                              {ele.bookedAppointments} / {ele.maxAppointments} Booked
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-8 text-center space-y-2 bg-slate-950 rounded-xl border border-slate-800">
                    <AlertCircle className="w-8 h-8 text-amber-400 mx-auto" />
                    <div className="text-sm font-semibold text-slate-300">No Slots Available for this Date</div>
                    <p className="text-xs text-slate-500">
                      The practitioner has not scheduled slots for {moment(date).format("MMM Do YYYY")}.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 text-slate-400 space-y-3">
            <div className="w-6 h-6 border-2 border-teal-400 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs">Loading doctor profile...</p>
          </div>
        )}
      </main>

      <footer className="w-full py-5 text-center text-xs text-slate-500 border-t border-slate-900 mt-12">
        © {new Date().getFullYear()} MediTrust Health Network.
      </footer>
    </div>
  );
};
