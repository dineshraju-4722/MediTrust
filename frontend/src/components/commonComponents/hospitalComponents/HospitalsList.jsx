import React, { useEffect, useState } from "react";
import { Navbar } from "../Navbar";
import { GetAllHospitals } from "../../../apiCalls/HospitalCalls";
import { useNavigate } from "react-router-dom";
import { Building2, MapPin, Search, ShieldCheck } from "lucide-react";

export default function HospitalsList() {
  const navigate = useNavigate();
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchHospitals() {
      setLoading(true);
      try {
        const res = await GetAllHospitals();
        if (Array.isArray(res)) {
          setHospitals(res);
        }
      } catch (err) {
        console.error("Error fetching hospitals:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchHospitals();
  }, []);

  const filteredHospitals = hospitals.filter(
    (h) =>
      h.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-900 text-teal-400 border border-slate-800 text-xs font-semibold mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              <span>Partner Healthcare Facilities</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-2">
              <Building2 className="w-6 h-6 text-teal-400" />
              <span>Hospital Directory</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Explore accredited medical centers, regional clinics, and specialized institutes.
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by hospital name or city..."
              className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-teal-500"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-16 text-slate-400 space-y-3">
            <div className="w-6 h-6 border-2 border-teal-400 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs">Loading hospital directory...</p>
          </div>
        ) : filteredHospitals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredHospitals.map((hosp) => (
              <div
                key={hosp.id}
                onClick={() => navigate(`/hospital/${hosp.id}`)}
                className="p-5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors space-y-3 cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-teal-400 transition-colors">
                      {hosp.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-rose-400" />
                      <span>{hosp.location}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>{hosp.contact || "Hospital reception"}</span>
                  <span className="text-teal-400 font-medium group-hover:underline">View Specialists &rarr;</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-xs text-slate-500 bg-slate-900/40 rounded-xl border border-slate-800">
            No matching hospitals found for &quot;{searchTerm}&quot;.
          </div>
        )}
      </main>

      <footer className="w-full py-5 text-center text-xs text-slate-500 border-t border-slate-900 mt-12">
        © {new Date().getFullYear()} MediTrust Health Network.
      </footer>
    </div>
  );
}
