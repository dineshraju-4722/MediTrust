import React, { useEffect, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Search, Stethoscope, Award, Calendar, ArrowRight } from "lucide-react";

export default function HospitalViewDoctors({ specializations, doctors }) {
  const navigate = useNavigate();
  const [doctSearch, setDoctSearch] = useState("");
  const [selectedSpecId, setSelectedSpecId] = useState(null);
  const [tempDoctors, setTempDoctors] = useState([]);

  function handleFilterAll() {
    setSelectedSpecId(null);
    setTempDoctors([...doctors]);
  }

  function handleDoctorFilter(id) {
    setSelectedSpecId(id);
    setTempDoctors(doctors.filter((e) => e.specialization?.id === id));
  }

  useEffect(() => {
    setTempDoctors([...doctors]);
  }, [doctors]);

  const finalDoctors = tempDoctors.filter(
    (e) =>
      doctSearch === "" ||
      e.name?.toLowerCase().includes(doctSearch.toLowerCase()) ||
      e.specialization?.name?.toLowerCase().includes(doctSearch.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Specialization Filter Bar */}
      <div className="space-y-3">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Filter by Specialization:
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={handleFilterAll}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${
              selectedSpecId === null
                ? "bg-teal-500 text-slate-950 border-teal-400 font-bold shadow-md shadow-teal-500/20"
                : "bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700"
            }`}
          >
            All Specializations ({doctors.length})
          </button>

          {specializations.map((spec) => (
            <button
              key={spec.id}
              onClick={() => handleDoctorFilter(spec.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${
                selectedSpecId === spec.id
                  ? "bg-teal-500 text-slate-950 border-teal-400 font-bold shadow-md shadow-teal-500/20"
                  : "bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700"
              }`}
            >
              {spec.Name || spec.name}
            </button>
          ))}
        </div>
      </div>

      {/* Doctor Search Input */}
      <div className="relative max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={doctSearch}
          placeholder="Search doctor by name or specialty..."
          className="w-full pl-10 pr-4 py-2.5 bg-slate-900/90 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-teal-500"
          onChange={(e) => setDoctSearch(e.target.value)}
        />
      </div>

      {/* Doctors Grid Cards */}
      {finalDoctors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {finalDoctors.map((doctor) => (
            <div
              key={doctor.id}
              onClick={() =>
                navigate(`/doctor/${doctor.id}/${moment().format("YYYY-MM-DD")}`)
              }
              className="p-5 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800/80 hover:border-teal-500/50 transition-all shadow-xl space-y-4 cursor-pointer group relative overflow-hidden"
            >
              <div className="flex items-center gap-4">
                <img
                  src={
                    doctor.imglink ||
                    "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&auto=format&fit=crop&q=80"
                  }
                  alt={doctor.name}
                  className="w-14 h-14 rounded-xl object-cover border border-teal-500/30 bg-slate-800 shrink-0"
                />
                <div>
                  <h4 className="text-base font-bold text-white group-hover:text-teal-400 transition-colors">
                    {doctor.name}
                  </h4>
                  <div className="text-xs font-semibold text-teal-400">
                    {doctor.specialization?.name}
                  </div>
                  {doctor.experience && (
                    <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                      <Award className="w-3 h-3 text-emerald-400" />
                      <span>{doctor.experience} Yrs Exp.</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-teal-400 font-bold">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  View Availability
                </span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 text-center text-xs text-slate-500">
          No doctors match your selected specialization or search criteria.
        </div>
      )}
    </div>
  );
}