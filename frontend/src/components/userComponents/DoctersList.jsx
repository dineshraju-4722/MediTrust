import React, { useEffect, useState } from "react";
import { Navbar } from "../commonComponents/Navbar";
import { getDoctersByType } from "../../apiCalls/DocterCalls";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { Rate } from "antd";
import { 
  Stethoscope, 
  Award, 
  Building2, 
  MapPin, 
  Calendar, 
  Star, 
  ArrowLeft,
  UserCheck
} from "lucide-react";

export const DoctersList = () => {
  const navigate = useNavigate();
  const { specialist } = useParams();
  const [docters, setDocters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const res = await getDoctersByType(specialist);
        if (res) {
          const activeDocters = res.filter((e) => e.status === "false");
          setDocters(activeDocters);
        }
      } catch (err) {
        console.error("Error fetching doctors:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, [specialist]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans relative overflow-x-hidden">
      <Navbar />

      {/* Ambient Lighting */}
      <div className="absolute top-20 left-1/3 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[140px] pointer-events-none" />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 z-10">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <button
              onClick={() => navigate("/home")}
              className="inline-flex items-center gap-1.5 text-xs text-teal-400 hover:text-teal-300 font-semibold mb-2 cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Dashboard
            </button>
            <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <Stethoscope className="w-7 h-7 text-teal-400" />
              <span>{specialist} Specialists</span>
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Select a verified doctor to view available appointment slots & ratings
            </p>
          </div>

          <span className="px-3.5 py-1.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/30 text-xs font-bold">
            {docters.length} Doctors Available
          </span>
        </div>

        {/* Doctor List Cards */}
        {loading ? (
          <div className="text-center py-16 text-slate-400 space-y-3">
            <div className="w-8 h-8 border-2 border-teal-400 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm">Loading {specialist} specialists...</p>
          </div>
        ) : docters.length > 0 ? (
          <div className="space-y-4">
            {docters.map((docter) => (
              <div
                key={docter.id}
                className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800/80 hover:border-teal-500/40 transition-all shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              >
                {/* Doctor Bio */}
                <div className="flex items-start sm:items-center gap-5">
                  <img
                    src={
                      docter.imglink ||
                      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&auto=format&fit=crop&q=80"
                    }
                    alt={docter.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-teal-500/30 bg-slate-800 shrink-0 shadow-lg"
                  />

                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-xl font-extrabold text-white">{docter.name}</h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/30 text-[11px] font-bold">
                        {docter.specialization?.name || specialist}
                      </span>
                    </div>

                    {/* Metadata items */}
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
                      <div className="flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-emerald-400" />
                        <span>{docter.experience} Years Exp.</span>
                      </div>

                      <div
                        onClick={() => navigate(`/hospital/${docter.hospital?.id}`)}
                        className="flex items-center gap-1.5 text-teal-400 hover:underline cursor-pointer"
                      >
                        <Building2 className="w-4 h-4" />
                        <span>{docter.hospital?.name}</span>
                      </div>

                      <div className="flex items-center gap-1.5 text-slate-400">
                        <MapPin className="w-4 h-4 text-rose-400" />
                        <span>{docter.hospital?.location}</span>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 pt-1">
                      <Rate value={docter.averageRating || 4.5} disabled className="text-amber-400 text-sm" />
                      <span className="text-xs font-bold text-slate-300">
                        ({docter.averageRating || 4.5})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Booking Button */}
                <button
                  onClick={() =>
                    navigate(`/doctor/${docter.id}/${moment().format("YYYY-MM-DD")}`)
                  }
                  className="w-full md:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer shrink-0"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Appointment</span>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 rounded-3xl bg-slate-900/40 border border-slate-800 text-center space-y-3">
            <UserCheck className="w-12 h-12 text-slate-500 mx-auto" />
            <h3 className="text-lg font-bold text-slate-300">No Doctors Found</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              There are currently no active specialists listed under {specialist}. Please try searching for another specialty or exploring partner hospitals.
            </p>
            <button
              onClick={() => navigate("/home")}
              className="mt-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-teal-400 font-bold text-xs rounded-xl"
            >
              Back to Search
            </button>
          </div>
        )}
      </main>

      <footer className="w-full py-6 text-center text-xs text-slate-500 border-t border-slate-900 mt-12 z-10">
        © {new Date().getFullYear()} MediTrust Health Platform. All rights reserved.
      </footer>
    </div>
  );
};