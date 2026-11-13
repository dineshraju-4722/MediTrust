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
    <div className="space-y-5">
      <div className="space-y-2">
        <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Filter by Specialty:
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={handleFilterAll}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors border cursor-pointer ${
              selectedSpecId === null
                ? "bg-teal-500 text-slate-950 border-teal-400 font-semibold"
                : "bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700"
            }`}
          >
            All Specialties ({doctors.length})
          </button>

          {specializations.map((spec) => (
            <button
              key={spec.id}
              onClick={() => handleDoctorFilter(spec.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors border cursor-pointer ${
                selectedSpecId === spec.id
                  ? "bg-teal-500 text-slate-950 border-teal-400 font-semibold"
                  : "bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700"
              }`}
            >
              {spec.Name || spec.name}
            </button>
          ))}
        </div>
      </div>

      <div className="relative max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={doctSearch}
          placeholder="Search practitioner by name or specialty..."
          className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-teal-500"
          onChange={(e) => setDoctSearch(e.target.value)}
        />
      </div>

      {finalDoctors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {finalDoctors.map((doctor) => (
            <div
              key={doctor.id}
              onClick={() =>
                navigate(`/doctor/${doctor.id}/${moment().format("YYYY-MM-DD")}`)
              }
              className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors space-y-3 cursor-pointer group"
            >
              <div className="flex items-center gap-3.5">
                {doctor.imglink ? (
                  <img
                    src={doctor.imglink}
                    alt={doctor.name}
                    className="w-12 h-12 rounded-lg object-cover bg-slate-800 shrink-0 border border-slate-800"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 text-teal-400">
                    <Stethoscope className="w-6 h-6" />
                  </div>
                )}
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-teal-400 transition-colors">
                    {doctor.name}
                  </h4>
                  <div className="text-xs text-teal-400">
                    {doctor.specialization?.name}
                  </div>
                  {doctor.experience && (
                    <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                      <Award className="w-3 h-3 text-emerald-400" />
                      <span>{doctor.experience}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-teal-400 font-medium">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  Schedule Consultation
                </span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 rounded-xl bg-slate-900/40 border border-slate-800 text-center text-xs text-slate-500">
          No practitioners match your selected filter or search term.
        </div>
      )}
    </div>
  );
}
