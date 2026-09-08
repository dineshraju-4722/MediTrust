import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Select, Input, message } from "antd";
import { PostDocterDetails } from "../../apiCalls/DocterPageCalls";
import { getSpecialistsNames } from "../../apiCalls/UserCalls";
import { GetAllHospitals } from "../../apiCalls/HospitalCalls";
import { useNavigate } from "react-router-dom";
import { getDocterByEmail } from "../../apiCalls/DocterCalls";
import { useSelector } from "react-redux";
import { Navbar } from "../commonComponents/Navbar";
import { 
  Stethoscope, 
  Building2, 
  Award, 
  Phone, 
  Mail, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  UserCheck,
  PlusCircle
} from "lucide-react";

export default function DocterHomePage() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();

  const [register, setRegister] = useState(false);
  const [specialization, setSpecializations] = useState([]);
  const [docter, setDocter] = useState({});
  const [hospitals, setHospitals] = useState([]);
  const [request, setRequest] = useState(false);
  const [loading, setLoading] = useState(true);

  async function DoctorPostRegister(data) {
    try {
      await PostDocterDetails(data);
      message.success("Application submitted successfully!");
      setRegister(false);
    } catch (err) {
      console.error(err);
      message.error("Registration failed. Please check form inputs.");
    }
  }

  useEffect(() => {
    async function func() {
      setLoading(true);
      try {
        if (currentUser?.email) {
          const res = await getDocterByEmail(currentUser.email);
          if (res) {
            setDocter(res);
            setRequest(true);
            if (res.status === "true") {
              message.success("Logged in as Doctor");
              navigate(`/doctorrole/${res.id}`);
            } else if (res.status === "false") {
              message.info("Doctor application pending approval.");
            }
          } else {
            setRequest(false);
          }
        }
        const res1 = await getSpecialistsNames();
        if (Array.isArray(res1)) setSpecializations(res1);

        const res2 = await GetAllHospitals();
        if (Array.isArray(res2)) setHospitals(res2);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    func();
  }, [currentUser, register]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans relative overflow-x-hidden">
      <Navbar />

      {/* Ambient Light */}
      <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[140px] pointer-events-none" />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-12 flex flex-col items-center justify-center z-10">
        
        {loading ? (
          <div className="text-center py-16 text-slate-400 space-y-3">
            <div className="w-8 h-8 border-2 border-teal-400 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm">Verifying doctor profile status...</p>
          </div>
        ) : !request ? (
          /* Request Doctor Account Card */
          <div className="w-full p-8 rounded-3xl bg-slate-900/90 border border-slate-800/80 backdrop-blur-xl shadow-2xl text-center space-y-6 max-w-lg">
            <div className="w-16 h-16 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-teal-400 flex items-center justify-center mx-auto shadow-lg">
              <Stethoscope className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                <span>Doctor Onboarding Portal</span>
              </div>
              <h2 className="text-2xl font-black text-white">Join as a Verified Doctor</h2>
              <p className="text-xs text-slate-400">
                You have created a user account. Complete your medical profile request to start accepting patient appointments.
              </p>
            </div>

            <button
              onClick={() => setRegister(true)}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-extrabold text-sm shadow-xl shadow-teal-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Submit Doctor Registration Request</span>
            </button>
          </div>
        ) : (
          /* Application Submitted Status Card */
          <div className="w-full p-8 rounded-3xl bg-slate-900/90 border border-slate-800/80 backdrop-blur-xl shadow-2xl space-y-6 max-w-2xl">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
              <div>
                <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-teal-400" />
                  <span>Doctor Registration Details</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">Application submitted for admin verification</p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${
                  docter.status === "true"
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                    : "bg-amber-500/10 text-amber-400 border-amber-500/30 animate-pulse"
                }`}
              >
                {docter.status === "true" ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Approved Doctor
                  </>
                ) : (
                  <>
                    <Clock className="w-3.5 h-3.5" />
                    Pending Admin Approval
                  </>
                )}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="text-slate-500 font-medium">Doctor Name</span>
                <div className="font-bold text-white text-sm">{docter.name}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="text-slate-500 font-medium">Email Address</span>
                <div className="font-bold text-slate-200">{docter.email}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="text-slate-500 font-medium">Specialization</span>
                <div className="font-bold text-teal-400">{docter.specialization?.name}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="text-slate-500 font-medium">Experience</span>
                <div className="font-bold text-slate-200">{docter.experience} Years</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1 sm:col-span-2">
                <span className="text-slate-500 font-medium">Affiliated Hospital</span>
                <div className="font-bold text-slate-200">
                  {docter.hospital?.name} ({docter.hospital?.location})
                </div>
              </div>
            </div>

            {docter.status === "false" && (
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs text-center space-y-1">
                <div className="font-bold">Pending Review</div>
                <div>Your request has been logged. An administrator will verify your credentials soon.</div>
              </div>
            )}
          </div>
        )}

        {/* Modal for Doctor Registration */}
        <Modal
          title="Doctor Registration Request"
          open={register}
          onCancel={() => setRegister(false)}
          footer={null}
          centered
          width={500}
        >
          <Form layout="vertical" onFinish={DoctorPostRegister} className="pt-2 space-y-3">
            <Form.Item label="Doctor Full Name" name="name" rules={[{ required: true, message: "Required" }]}>
              <Input placeholder="Dr. Jane Smith" />
            </Form.Item>

            <Form.Item label="Email" name="email" rules={[{ required: true, message: "Required" }]}>
              <Input type="email" placeholder="doctor@meditrust.com" />
            </Form.Item>

            <Form.Item label="Contact Number" name="contact" rules={[{ required: true, message: "Required" }]}>
              <Input placeholder="+1 234 567 8900" />
            </Form.Item>

            <Form.Item label="Years of Experience" name="experience" rules={[{ required: true, message: "Required" }]}>
              <Input placeholder="e.g. 8 Years" />
            </Form.Item>

            <Form.Item label="Profile Image URL" name="imglink">
              <Input placeholder="https://..." />
            </Form.Item>

            <Form.Item label="Specialization" name="specializationId" rules={[{ required: true, message: "Required" }]}>
              <Select placeholder="Select Specialization">
                {specialization.map((spec) => (
                  <Select.Option key={spec.id} value={spec.id}>
                    {spec.Name || spec.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Affiliated Hospital" name="hospitalId" rules={[{ required: true, message: "Required" }]}>
              <Select placeholder="Select Hospital">
                {hospitals.map((h) => (
                  <Select.Option key={h.id} value={h.id}>
                    {h.name} ({h.location})
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Button type="primary" htmlType="submit" block className="mt-4 bg-teal-600 hover:bg-teal-500 font-bold">
              Submit Doctor Application
            </Button>
          </Form>
        </Modal>

      </main>

      <footer className="w-full py-6 text-center text-xs text-slate-500 border-t border-slate-900 mt-12 z-10">
        © {new Date().getFullYear()} MediTrust Health Platform. All rights reserved.
      </footer>
    </div>
  );
}