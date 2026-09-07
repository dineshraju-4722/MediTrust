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
  CalendarDays,
  UserCheck
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
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentUser]);

  // Categories list with fallback icons
  const popularCategories = [
    { name: "Cardiology", icon: Heart, color: "from-rose-500/20 to-red-500/10 text-rose-400 border-rose-500/30" },
    { name: "Neurology", icon: Brain, color: "from-purple-500/20 to-indigo-500/10 text-purple-400 border-purple-500/30" },
    { name: "Pediatrics", icon: Baby, color: "from-amber-500/20 to-yellow-500/10 text-amber-400 border-amber-500/30" },
    { name: "Orthopedics", icon: Bone, color: "from-cyan-500/20 to-blue-500/10 text-cyan-400 border-cyan-500/30" },
    { name: "General Medicine", icon: Stethoscope, color: "from-teal-500/20 to-emerald-500/10 text-teal-400 border-teal-500/30" },
    { name: "Dermatology", icon: Sparkles, color: "from-pink-500/20 to-rose-500/10 text-pink-400 border-pink-500/30" },
  ];

  const upcomingAppointments = appointments.filter((item) =>
    moment(`${item.date} ${item.time}`, "YYYY-MM-DD HH:mm:ss").isSameOrAfter(moment())
  );

  const pastAppointments = appointments.filter((item) =>
    moment(`${item.date} ${item.time}`, "YYYY-MM-DD HH:mm:ss").isBefore(moment())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans relative overflow-x-hidden">
      {/* Fixed Backdrop-Blur Navbar */}
      <Navbar />

      {/* Ambient background lights */}
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-96 right-10 w-[450px] h-[450px] bg-cyan-600/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 z-10">
        
        {/* Welcome Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-slate-950 border border-slate-800/80 backdrop-blur-xl shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              <span>Verified Patient Portal</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Welcome back, <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">{currentUser?.name || "Patient"}</span> 👋
            </h1>
            <p className="text-sm text-slate-400">
              Manage your healthcare schedule, discover verified specialists, and view your consultation history.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 shrink-0">
            <div className="p-3 rounded-xl bg-teal-500/10 text-teal-400">
              <CalendarDays className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Upcoming</div>
              <div className="text-2xl font-black text-white">{upcomingAppointments.length}</div>
            </div>
          </div>
        </div>

        {/* Search & Categories Hub */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-teal-400" />
                Find Medical Specialists
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Search by medical field or select a specialty below</p>
            </div>

            {/* Hospital Explorer Shortcut */}
            <button
              onClick={() => navigate('/hospitals')}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-teal-400 border border-teal-500/30 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Building2 className="w-4 h-4 text-teal-400" />
              <span>Explore Partner Hospitals</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Search Input */}
          <div className="relative max-w-2xl">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              list="specialists-list"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search specialists (e.g. Cardiologist, Neurologist, Dentist...)"
              className="w-full pl-12 pr-4 py-3.5 bg-slate-900/90 border border-slate-800 rounded-2xl text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-sm sm:text-base shadow-xl transition-all"
            />
            <datalist id="specialists-list">
              {specialists.map((e, index) => (
                <option key={index} value={e.Name}>
                  {e.Name}
                </option>
              ))}
            </datalist>
          </div>

          {/* Category Chips Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {popularCategories.map((cat, idx) => {
              const IconComp = cat.icon;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectSpecialty(cat.name)}
                  className={`p-3.5 rounded-2xl bg-gradient-to-b ${cat.color} border backdrop-blur-md flex flex-col items-center justify-center gap-2 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 group cursor-pointer`}
                >
                  <div className="p-2 rounded-xl bg-slate-950/60 group-hover:bg-slate-900 transition-colors">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-slate-200 tracking-tight text-center">
                    {cat.name}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Appointments Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
          
          {/* Upcoming Appointments Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-teal-400" />
                Upcoming Consultations
              </h3>
              <span className="text-xs text-slate-400 bg-slate-900 px-2.5 py-1 rounded-full border border-slate-800">
                {upcomingAppointments.length} Active
              </span>
            </div>

            {upcomingAppointments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {upcomingAppointments.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-teal-500/30 hover:border-teal-500/60 transition-all shadow-xl space-y-3 relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-emerald-400" />
                    
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <div className="text-base font-bold text-white">Dr. {item.doctorName}</div>
                        <div className="text-xs text-teal-400 font-semibold">{item.specializationName}</div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-extrabold uppercase tracking-wider">
                        Upcoming
                      </span>
                    </div>

                    <div className="pt-2 border-t border-slate-800/80 space-y-1.5 text-xs text-slate-300">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{moment(item.date).format("dddd, MMM Do YYYY")}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{moment(item.time, "HH:mm:ss").format("hh:mm A")}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-400">
                        <Building2 className="w-3.5 h-3.5 text-slate-400" />
                        <span>{item.hospitalName}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800/80 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
                  <CalendarDays className="w-6 h-6" />
                </div>
                <div className="text-sm font-bold text-slate-300">No Upcoming Appointments</div>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  You don't have any scheduled doctor consultations right now. Search above to book a specialist!
                </p>
              </div>
            )}
          </div>

          {/* Previous Appointments Sidebar */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-slate-400" />
                Consultation History
              </h3>
              <span className="text-xs text-slate-400 bg-slate-900 px-2.5 py-1 rounded-full border border-slate-800">
                {pastAppointments.length} Completed
              </span>
            </div>

            <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
              {pastAppointments.length > 0 ? (
                pastAppointments.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors text-xs space-y-2"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-bold text-slate-200">Dr. {item.doctorName}</div>
                        <div className="text-[11px] text-slate-400">{item.specializationName}</div>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                        Past
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-slate-400 pt-1 text-[11px]">
                      <span>{moment(item.date).format("MMM Do YYYY")}</span>
                      <span>{item.hospitalName}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 rounded-xl bg-slate-900/30 border border-slate-800 text-center text-xs text-slate-500">
                  No past consultation history recorded yet.
                </div>
              )}
            </div>
          </div>

        </section>

      </main>

      {/* Footer copyright */}
      <footer className="w-full py-6 text-center text-xs text-slate-500 border-t border-slate-900 mt-12 z-10">
        © {new Date().getFullYear()} MediTrust Health Platform. All rights reserved.
      </footer>
    </div>
  );
};