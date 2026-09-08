import React, { useEffect, useState } from "react";
import { Button, Form, Modal, DatePicker, TimePicker, InputNumber, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { PostDoctorAvailability } from "../../apiCalls/AppointmentsCalls";
import { useSelector } from "react-redux";
import { getDocter } from "../../apiCalls/DocterCalls";
import { Navbar } from "../commonComponents/Navbar";
import { 
  Stethoscope, 
  Building2, 
  Award, 
  Phone, 
  Mail, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  PlusCircle,
  ShieldCheck
} from "lucide-react";

export default function AdminPage() {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  const [availability, setAvailability] = useState(false);
  const [docter, setDocter] = useState({});
  const [loading, setLoading] = useState(true);
  const { doctid } = useParams();

  async function DoctorPostAvailabilty(values) {
    const payload = {
      date: values.date.format("YYYY-MM-DD"),
      startTime: values.startTime.format("HH:mm:ss"),
      endTime: values.endTime.format("HH:mm:ss"),
      maxAppointments: values.maxAppointments,
      bookedAppointments: values.bookedAppointments || 0,
      doctorId: Number(doctid),
    };
    try {
      await PostDoctorAvailability(payload);
      message.success("Availability slot posted successfully!");
      setAvailability(false);
    } catch (err) {
      console.error(err);
      message.error(err.response?.data?.message || "Failed to post availability.");
    }
  }

  useEffect(() => {
    async function func() {
      setLoading(true);
      try {
        const res = await getDocter(doctid);
        if (res) setDocter(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    func();
  }, [doctid]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans relative overflow-x-hidden">
      <Navbar />

      {/* Ambient Glow */}
      <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[140px] pointer-events-none" />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-12 space-y-8 z-10">
        
        {/* Header Hero */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800/80 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              <span>Doctor Practice Management</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Doctor Dashboard
            </h1>
            <p className="text-sm text-slate-400">
              Manage your availability slots and view your active practice status.
            </p>
          </div>

          <button
            onClick={() => setAvailability(true)}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-extrabold text-sm shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post New Slot Availability</span>
          </button>
        </div>

        {/* Doctor Profile Info Card */}
        {loading ? (
          <div className="text-center py-16 text-slate-400 space-y-3">
            <div className="w-8 h-8 border-2 border-teal-400 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm">Loading practice details...</p>
          </div>
        ) : docter.name ? (
          <div className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800/80 backdrop-blur-xl shadow-2xl space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
              <div className="flex items-center gap-4">
                <img
                  src={
                    docter.imglink ||
                    "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&auto=format&fit=crop&q=80"
                  }
                  alt={docter.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-teal-500/30 bg-slate-800"
                />
                <div>
                  <h2 className="text-2xl font-black text-white">{docter.name}</h2>
                  <div className="text-sm font-semibold text-teal-400">
                    {docter.specialization?.name}
                  </div>
                </div>
              </div>

              <span className="px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Active Practitioner
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="text-slate-500 font-medium flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-purple-400" /> Email Address
                </span>
                <div className="font-bold text-slate-200 text-sm">{docter.email}</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="text-slate-500 font-medium flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-cyan-400" /> Contact Phone
                </span>
                <div className="font-bold text-slate-200 text-sm">{docter.contact || "N/A"}</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="text-slate-500 font-medium flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-400" /> Experience
                </span>
                <div className="font-bold text-slate-200 text-sm">{docter.experience} Years</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1 sm:col-span-2 lg:col-span-3">
                <span className="text-slate-500 font-medium flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-teal-400" /> Affiliated Hospital
                </span>
                <div className="font-bold text-white text-sm">
                  {docter.hospital?.name} — <span className="text-slate-400">{docter.hospital?.location}</span>
                </div>
              </div>
            </div>

          </div>
        ) : null}

        {/* Modal for Posting Availability */}
        <Modal
          title="Post Availability Slot"
          open={availability}
          onCancel={() => setAvailability(false)}
          footer={null}
          centered
          width={450}
        >
          <Form layout="vertical" onFinish={DoctorPostAvailabilty} className="pt-2 space-y-3">
            <Form.Item label="Date" name="date" rules={[{ required: true, message: "Please select a date" }]}>
              <DatePicker className="w-full" />
            </Form.Item>

            <div className="grid grid-cols-2 gap-3">
              <Form.Item label="Start Time" name="startTime" rules={[{ required: true, message: "Start time required" }]}>
                <TimePicker className="w-full" format="HH:mm" />
              </Form.Item>

              <Form.Item label="End Time" name="endTime" rules={[{ required: true, message: "End time required" }]}>
                <TimePicker className="w-full" format="HH:mm" />
              </Form.Item>
            </div>

            <Form.Item label="Max Appointments Limit" name="maxAppointments" rules={[{ required: true, message: "Max limit required" }]}>
              <InputNumber className="w-full" min={1} placeholder="e.g. 10" />
            </Form.Item>

            <Form.Item label="Already Booked (Optional)" name="bookedAppointments" initialValue={0}>
              <InputNumber className="w-full" min={0} />
            </Form.Item>

            <Button type="primary" htmlType="submit" block className="mt-4 bg-teal-600 hover:bg-teal-500 font-bold">
              Publish Availability Slot
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