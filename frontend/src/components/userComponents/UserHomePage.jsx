import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAppointmentsByUser, getSpecialistsNames } from "../../apiCalls/UserCalls";
import { Navbar } from "../commonComponents/Navbar";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { 
  Search, 
  Calendar, 
  Clock, 
  Building2, 
  Stethoscope, 
  Heart, 
  Brain, 
  Baby, 
  Bone, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  CalendarDays
} from "lucide-react";

export const UserHomePage = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  const [appointments, setAppointments] = useState([]);
  const [specialists, setSpecialists] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);

    const match = specialists.find(
      (spec) => spec.Name?.toLowerCase() === val.toLowerCase()
    );
    if (match) {
      navigate(`/doctors/${match.Name}`);
    }
  };

  const handleSelectSpecialty = (specialtyName) => {
    navigate(`/doctors/${specialtyName}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (currentUser?.id) {
          const res = await getAppointmentsByUser(currentUser.id);
          if (Array.isArray(res)) {
            setAppointments(res);
          }
        }
        const res1 = await getSpecialistsNames();
        if (Array.isArray(res1)) {
          setSpecialists(res1);
        }
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentUser]);

  const popularCategories = [
    { name: "Cardiology", icon: Heart },
    { name: "Neurology", icon: Brain },
    { name: "Pediatrics", icon: Baby },
    { name: "Orthopedics", icon: Bone },
    { name: "General Medicine", icon: Stethoscope },
    { name: "Dermatology", icon: Sparkles },
  ];

  const upcomingAppointments = appointments.filter((item) =>
    moment(`${item.date} ${item.time}`, "YYYY-MM-DD HH:mm:ss").isSameOrAfter(moment())
  );

  const pastAppointments = appointments.filter((item) =>
    moment(`${item.date} ${item.time}`, "YYYY-MM-DD HH:mm:ss").isBefore(moment())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-teal-500/10 text-teal-400 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Patient Dashboard</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Welcome, {currentUser?.name || "Patient"}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Manage your upcoming doctor consultations and search medical specialists across partner hospitals.
            </p>
          </div>

          <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-slate-950 border border-slate-800 shrink-0">
            <div className="p-2.5 rounded-lg bg-teal-500/10 text-teal-400">
              <CalendarDays className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Upcoming</div>
              <div className="text-xl font-bold text-white">{upcomingAppointments.length} Bookings</div>
            </div>
          </div>
        </div>

        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-teal-400" />
                Find Medical Specialists
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Search by clinical field or choose a medical specialty below</p>
            </div>

            <button
              onClick={() => navigate("/hospitals")}
              className="px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-teal-400 border border-slate-800 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Building2 className="w-4 h-4 text-teal-400" />
              <span>Partner Hospitals</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="relative max-w-2xl">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              list="specialists-list"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search by specialty (Cardiologist, Neurologist, Dentist...)"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-teal-500 text-sm"
            />
            <datalist id="specialists-list">
              {specialists.map((e, index) => (
                <option key={index} value={e.Name}>
                  {e.Name}
                </option>
              ))}
            </datalist>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
            {popularCategories.map((cat, idx) => {
              const IconComp = cat.icon;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectSpecialty(cat.name)}
                  className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800/90 border border-slate-800 hover:border-teal-500/40 flex flex-col items-center justify-center gap-2 transition-all cursor-pointer group"
                >
                  <div className="p-2 rounded-lg bg-slate-950 text-teal-400 group-hover:text-teal-300 transition-colors">
                    <IconComp className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-medium text-slate-200 text-center">
                    {cat.name}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-2">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-teal-400" />
                Upcoming Appointments
              </h3>
              <span className="text-xs text-slate-400 bg-slate-900 px-2.5 py-0.5 rounded-full border border-slate-800">
                {upcomingAppointments.length} Active
              </span>
            </div>

            {upcomingAppointments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {upcomingAppointments.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors space-y-3"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <div className="text-sm font-bold text-white">Dr. {item.doctorName}</div>
                        <div className="text-xs text-teal-400">{item.specializationName}</div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-semibold uppercase tracking-wider">
                        Confirmed
                      </span>
                    </div>

                    <div className="pt-2 border-t border-slate-800 space-y-1.5 text-xs text-slate-300">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        <span>{moment(item.date).format("dddd, MMM Do YYYY")}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        <span>{moment(item.time, "HH:mm:ss").format("hh:mm A")}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-400">
                        <Building2 className="w-3.5 h-3.5 text-slate-500" />
                        <span>{item.hospitalName}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 rounded-xl bg-slate-900/50 border border-slate-800 text-center space-y-2">
                <CalendarDays className="w-8 h-8 text-slate-500 mx-auto" />
                <div className="text-sm font-semibold text-slate-300">No scheduled consultations</div>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  You do not have any upcoming appointments. Select a specialty above to book a doctor.
                </p>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-slate-400" />
                Consultation History
              </h3>
              <span className="text-xs text-slate-400 bg-slate-900 px-2 py-0.5 rounded-full border border-slate-800">
                {pastAppointments.length}
              </span>
            </div>

            <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
              {pastAppointments.length > 0 ? (
                pastAppointments.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1.5"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold text-slate-200">Dr. {item.doctorName}</div>
                        <div className="text-[11px] text-slate-400">{item.specializationName}</div>
                      </div>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                        Completed
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-slate-400 pt-1 text-[11px]">
                      <span>{moment(item.date).format("MMM Do YYYY")}</span>
                      <span>{item.hospitalName}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800 text-center text-xs text-slate-500">
                  No past consultation history recorded yet.
                </div>
              )}
            </div>
          </div>
        </section>

      </main>

      <footer className="w-full py-5 text-center text-xs text-slate-500 border-t border-slate-900 mt-12">
        © {new Date().getFullYear()} MediTrust Health Network.
      </footer>
    </div>
  );
};
