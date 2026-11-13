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
      message.success("Availability slot posted successfully.");
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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-10 space-y-6">
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-800 text-teal-400 text-xs font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              <span>Doctor Practice Management</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Doctor Schedule & Practice Console
            </h1>
            <p className="text-xs text-slate-400">
              Manage patient consultation windows and publish date-specific booking slots.
            </p>
          </div>

          <button
            onClick={() => setAvailability(true)}
            className="px-4 py-2.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Slot Availability</span>
          </button>
        </div>

        {loading ? (
          <div className="text-center py-16 text-slate-400 space-y-3">
            <div className="w-6 h-6 border-2 border-teal-400 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs">Loading practice details...</p>
          </div>
        ) : docter.name ? (
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3.5">
                {docter.imglink ? (
                  <img
                    src={docter.imglink}
                    alt={docter.name}
                    className="w-14 h-14 rounded-xl object-cover bg-slate-800 border border-slate-700"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-teal-400">
                    <Stethoscope className="w-7 h-7" />
                  </div>
                )}
                <div>
                  <h2 className="text-lg font-bold text-white">{docter.name}</h2>
                  <div className="text-xs text-teal-400">
                    {docter.specialization?.name}
                  </div>
                </div>
              </div>

              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Active Practitioner
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-500 font-medium flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" /> Email Address
                </span>
                <div className="font-semibold text-slate-200">{docter.email}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-500 font-medium flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" /> Contact Phone
                </span>
                <div className="font-semibold text-slate-200">{docter.contact || "Not listed"}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-500 font-medium flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-emerald-400" /> Experience
                </span>
                <div className="font-semibold text-slate-200">{docter.experience || "Experienced"}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1 sm:col-span-2 lg:col-span-3">
                <span className="text-slate-500 font-medium flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-teal-400" /> Hospital Affiliation
                </span>
                <div className="font-semibold text-white">
                  {docter.hospital?.name} &bull; <span className="text-slate-400">{docter.hospital?.location}</span>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <Modal
          title="Publish Availability Slot"
          open={availability}
          onCancel={() => setAvailability(false)}
          footer={null}
          centered
          width={440}
        >
          <Form layout="vertical" onFinish={DoctorPostAvailabilty} className="pt-2 space-y-2">
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

            <Form.Item label="Max Capacity" name="maxAppointments" rules={[{ required: true, message: "Required" }]}>
              <InputNumber className="w-full" min={1} placeholder="Number of patient slots" />
            </Form.Item>

            <Form.Item label="Already Reserved" name="bookedAppointments" initialValue={0}>
              <InputNumber className="w-full" min={0} />
            </Form.Item>

            <Button type="primary" htmlType="submit" block className="mt-3 bg-teal-600 hover:bg-teal-500 font-bold">
              Confirm & Publish Slot
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
