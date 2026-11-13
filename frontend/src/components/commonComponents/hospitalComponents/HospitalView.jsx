import React, { useEffect, useState } from "react";
import { Navbar } from "../Navbar";
import { getSpecialistsNames } from "../../../apiCalls/UserCalls";
import { GetHospitalById } from "../../../apiCalls/HospitalCalls";
import { useNavigate, useParams } from "react-router-dom";
import HospitalViewDoctors from "./HospitalViewDoctors";
import { Building2, MapPin, Stethoscope, ArrowLeft, ShieldCheck } from "lucide-react";

export default function HospitalView() {
  const [hospital, setHospital] = useState({});
  const [specializations, setSpecializations] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function func() {
      setLoading(true);
      try {
        const spec = await getSpecialistsNames();
        if (Array.isArray(spec)) setSpecializations(spec);

        const hosp = await GetHospitalById(id);
        if (hosp) {
          setHospital(hosp);
          if (Array.isArray(hosp.docters)) setDoctors(hosp.docters);
        }
      } catch (err) {
        console.error("Error fetching hospital details:", err);
      } finally {
        setLoading(false);
      }
    }
    func();
  }, [id]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div>
          <button
            onClick={() => navigate("/hospitals")}
            className="inline-flex items-center gap-1.5 text-xs text-teal-400 hover:text-teal-300 font-semibold cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Hospitals Directory
          </button>
        </div>

        {hospital.name ? (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
                  <Building2 className="w-7 h-7" />
                </div>
                
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-800 text-teal-400 text-[11px] font-medium">
                    <ShieldCheck className="w-3 h-3 text-teal-400" />
                    <span>Affiliated Partner</span>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-bold text-white">{hospital.name}</h1>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" />
                    <span>{hospital.location}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 shrink-0">
                <Stethoscope className="w-5 h-5 text-teal-400" />
                <div>
                  <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Staff</div>
                  <div className="text-base font-bold text-white">{doctors.length} Doctors</div>
                </div>
              </div>
            </div>

            <HospitalViewDoctors specializations={specializations} doctors={doctors} />
          </div>
        ) : (
          <div className="text-center py-16 text-slate-400 space-y-3">
            <div className="w-6 h-6 border-2 border-teal-400 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs">Loading hospital information...</p>
          </div>
        )}
      </main>

      <footer className="w-full py-5 text-center text-xs text-slate-500 border-t border-slate-900 mt-12">
        © {new Date().getFullYear()} MediTrust Health Network.
      </footer>
    </div>
  );
}
