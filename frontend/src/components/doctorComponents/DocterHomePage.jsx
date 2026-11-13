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
      message.success("Doctor profile submitted for review.");
      setRegister(false);
    } catch (err) {
      console.error(err);
      message.error("Registration request failed. Please check your inputs.");
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
              navigate(`/doctorrole/${res.id}`);
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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-12 flex flex-col items-center justify-center">
        {loading ? (
          <div className="text-center py-16 text-slate-400 space-y-3">
            <div className="w-6 h-6 border-2 border-teal-400 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs">Verifying doctor account status...</p>
          </div>
        ) : !request ? (
          <div className="w-full p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-5 max-w-lg">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center mx-auto">
              <Stethoscope className="w-6 h-6" />
            </div>

            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-800 text-teal-400 text-xs font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                <span>Doctor Portal</span>
              </div>
              <h2 className="text-xl font-bold text-white">Register as a Practicing Physician</h2>
              <p className="text-xs text-slate-400">
                Submit your credentials and hospital affiliation to start accepting patient appointments.
              </p>
            </div>

            <button
              onClick={() => setRegister(true)}
              className="w-full py-2.5 px-4 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Complete Doctor Registration</span>
            </button>
          </div>
        ) : (
          <div className="w-full p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-5 max-w-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-teal-400" />
                  <span>Doctor Account Overview</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">Verification status and profile details</p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1.5 ${
                  docter.status === "true"
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                    : "bg-amber-500/10 text-amber-300 border-amber-500/20"
                }`}
              >
                {docter.status === "true" ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Verified Practitioner
                  </>
                ) : (
                  <>
                    <Clock className="w-3.5 h-3.5" />
                    Pending Verification
                  </>
                )}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-0.5">
                <span className="text-slate-500">Name</span>
                <div className="font-semibold text-white">{docter.name}</div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-0.5">
                <span className="text-slate-500">Email</span>
                <div className="font-semibold text-slate-200">{docter.email}</div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-0.5">
                <span className="text-slate-500">Specialty</span>
                <div className="font-semibold text-teal-400">{docter.specialization?.name}</div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-0.5">
                <span className="text-slate-500">Experience</span>
                <div className="font-semibold text-slate-200">{docter.experience || "Not listed"}</div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-0.5 sm:col-span-2">
                <span className="text-slate-500">Hospital Affiliation</span>
                <div className="font-semibold text-slate-200">
                  {docter.hospital?.name} ({docter.hospital?.location})
                </div>
              </div>
            </div>

            {docter.status === "false" && (
              <div className="p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs text-center space-y-1">
                <div className="font-semibold">Review in Progress</div>
                <div className="text-amber-300/80">Your doctor registration has been received and is awaiting clinical verification by administrator.</div>
              </div>
            )}
          </div>
        )}

        <Modal
          title="Doctor Registration"
          open={register}
          onCancel={() => setRegister(false)}
          footer={null}
          centered
          width={480}
        >
          <Form layout="vertical" onFinish={DoctorPostRegister} className="pt-2 space-y-2">
            <Form.Item label="Full Name with Title" name="name" rules={[{ required: true, message: "Required" }]}>
              <Input placeholder="Dr. Full Name" />
            </Form.Item>

            <Form.Item label="Email" name="email" rules={[{ required: true, message: "Required" }]}>
              <Input type="email" placeholder="doctor@meditrust.com" />
            </Form.Item>

            <Form.Item label="Contact Number" name="contact" rules={[{ required: true, message: "Required" }]}>
              <Input placeholder="+1 234 567 8900" />
            </Form.Item>

            <Form.Item label="Years of Experience" name="experience" rules={[{ required: true, message: "Required" }]}>
              <Input placeholder="e.g. 10 Years" />
            </Form.Item>

            <Form.Item label="Profile Photo Link" name="imglink">
              <Input placeholder="https://..." />
            </Form.Item>

            <Form.Item label="Specialty" name="specializationId" rules={[{ required: true, message: "Required" }]}>
              <Select placeholder="Select Specialty">
                {specialization.map((spec) => (
                  <Select.Option key={spec.id} value={spec.id}>
                    {spec.Name || spec.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Hospital Affiliation" name="hospitalId" rules={[{ required: true, message: "Required" }]}>
              <Select placeholder="Select Hospital">
                {hospitals.map((h) => (
                  <Select.Option key={h.id} value={h.id}>
                    {h.name} ({h.location})
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Button type="primary" htmlType="submit" block className="mt-3 bg-teal-600 hover:bg-teal-500 font-bold">
              Submit Profile
            </Button>
          </Form>
        </Modal>
      </main>

      <footer className="w-full py-5 text-center text-xs text-slate-500 border-t border-slate-900 mt-12">
        © {new Date().getFullYear()} MediTrust Health Network.
      </footer>
    </div>
  );
}
