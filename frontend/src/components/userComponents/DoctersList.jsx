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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <button
              onClick={() => navigate("/home")}
              className="inline-flex items-center gap-1.5 text-xs text-teal-400 hover:text-teal-300 font-semibold mb-2 cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Appointments
            </button>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-2">
              <Stethoscope className="w-6 h-6 text-teal-400" />
              <span>{specialist} Specialists</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Select a verified practitioner to view available appointment slots and patient reviews.
            </p>
          </div>

          <span className="px-3 py-1 rounded-full bg-slate-900 text-teal-400 border border-slate-800 text-xs font-semibold">
            {docters.length} {docters.length === 1 ? "Practitioner" : "Practitioners"}
          </span>
        </div>

        {loading ? (
          <div className="text-center py-16 text-slate-400 space-y-3">
            <div className="w-6 h-6 border-2 border-teal-400 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs">Loading {specialist} doctors...</p>
          </div>
        ) : docters.length > 0 ? (
          <div className="space-y-3">
            {docters.map((docter) => (
              <div
                key={docter.id}
                className="p-5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
              >
                <div className="flex items-start sm:items-center gap-4">
                  {docter.imglink ? (
                    <img
                      src={docter.imglink}
                      alt={docter.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover bg-slate-800 shrink-0 border border-slate-800"
                    />
                  ) : (
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 text-slate-400">
                      <Stethoscope className="w-7 h-7 text-teal-400" />
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-bold text-white">{docter.name}</h3>
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px] font-medium">
                        {docter.specialization?.name || specialist}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Award className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{docter.experience || "Experienced"}</span>
                      </div>

                      <div
                        onClick={() => navigate(`/hospital/${docter.hospital?.id}`)}
                        className="flex items-center gap-1.5 text-teal-400 hover:underline cursor-pointer"
                      >
                        <Building2 className="w-3.5 h-3.5" />
                        <span>{docter.hospital?.name}</span>
                      </div>

                      <div className="flex items-center gap-1.5 text-slate-400">
                        <MapPin className="w-3.5 h-3.5 text-rose-400" />
                        <span>{docter.hospital?.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-0.5">
                      <Rate value={docter.averageRating || 4.5} disabled className="text-amber-400 text-xs" />
                      <span className="text-xs text-slate-400">
                        ({docter.averageRating ? docter.averageRating.toFixed(1) : "4.5"})
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() =>
                    navigate(`/doctor/${docter.id}/${moment().format("YYYY-MM-DD")}`)
                  }
                  className="w-full md:w-auto px-4 py-2.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shrink-0"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>View Schedule</span>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-10 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-3">
            <UserCheck className="w-10 h-10 text-slate-500 mx-auto" />
            <h3 className="text-base font-bold text-slate-300">No Specialists Listed</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              There are currently no practitioners listed under {specialist}. You can explore other departments or partner hospital profiles.
            </p>
            <button
              onClick={() => navigate("/home")}
              className="mt-2 px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-teal-400 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
            >
              Back to Specialties
            </button>
          </div>
        )}
      </main>

      <footer className="w-full py-5 text-center text-xs text-slate-500 border-t border-slate-900 mt-12">
        © {new Date().getFullYear()} MediTrust Health Network.
      </footer>
    </div>
  );
};
