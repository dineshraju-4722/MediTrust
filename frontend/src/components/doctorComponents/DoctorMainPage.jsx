import { Button, Form, Modal, DatePicker, TimePicker, InputNumber, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostDoctorAvailability } from "../../apiCalls/AppointmentsCalls";
// import DocterMainPage from "./DocterHomePage";
import { useSelector } from "react-redux";
import { getDocter, getDocterByEmail } from "../../apiCalls/DocterCalls";
import { Navbar } from "../commonComponents/Navbar";

export default function AdminPage() {

    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.user.currentUser);
    const [availability, setAvailability] = useState(false)
    const [docter, setDocter] = useState({})
    const { doctid } = useParams();
    async function DoctorPostAvailabilty(values) {

        const payload = {
            date: values.date.format("YYYY-MM-DD"),
            startTime: values.startTime.format("HH:mm:ss"),
            endTime: values.endTime.format("HH:mm:ss"),
            maxAppointments: values.maxAppointments,
            bookedAppointments: values.bookedAppointments || 0,
            doctorId: Number(doctid)
        };
        try {
            const res = await PostDoctorAvailability(payload);
            message.success('Posted Successfully')
            setAvailability(false)
        }
        catch (err) {
            message.error(err)
        }
    }

    useEffect(() => {
        async function func(id) {
            try {
                const res = await getDocter(doctid);
                console.log(res)
                setDocter(res)
            } catch (err) {
                message.error(err)
            }
        }
        func();
    }, [])



    return <>
        <Navbar />
        <Modal title="Post Availability"
            open={availability}
            onCancel={() => setAvailability(false)}
            footer={null}
            centered>
            <Form
                layout="vertical"
                onFinish={DoctorPostAvailabilty}
                className="w-[25rem] bg-white p-6 rounded-xl shadow-md"
            >


                <Form.Item
                    label="Date"
                    name="date"
                    rules={[{ required: true, message: "Please select a date" }]}
                >
                    <DatePicker className="w-full" />
                </Form.Item>

                <Form.Item
                    label="Start Time"
                    name="startTime"
                    rules={[{ required: true, message: "Please select start time" }]}
                >
                    <TimePicker className="w-full" format="HH:mm" />
                </Form.Item>

                <Form.Item
                    label="End Time"
                    name="endTime"
                    rules={[{ required: true, message: "Please select end time" }]}
                >
                    <TimePicker className="w-full" format="HH:mm" />
                </Form.Item>

                <Form.Item
                    label="Max Appointments"
                    name="maxAppointments"
                    rules={[{ required: true, message: "Please enter max appointments" }]}
                >
                    <InputNumber className="w-full" min={1} />
                </Form.Item>

                <Form.Item
                    label="Booked Appointments"
                    name="bookedAppointments"
                    initialValue={0}
                >
                    <InputNumber className="w-full" min={0} />
                </Form.Item>



                <Button type="primary" htmlType="submit" block>
                    Submit
                </Button>
            </Form>
        </Modal>
        <section className="flex   w-[100vw] h-[80vh] justify-evenly items-center p-[3vw] doctot-admin-page ">





            <section className="flex flex-col">
                <p className="font-bold underline text-xl px-[3vw] mb-[2rem]">Dashboard </p>
                {docter.name !== undefined && <>
                    <p> <b> Name </b> :    {docter.name}</p>
                    <p><b> email</b> : {docter.email}</p>
                    <p><b> contact </b>: {docter.contact}</p>
                    <p><b> hospital </b>: {docter.hospital.name}</p>
                    <p><b> specialization</b> : {docter.specialization.name}</p>
                    <p><b>  experience</b> : {docter.experience}</p>
                    <section>

                        <b>status</b> : {docter.status === "true" ?
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 52 52"
                                width="80"
                                height="80"
                            >
                                <circle
                                    cx="26"
                                    cy="26"
                                    r="25"
                                    fill="none"
                                    stroke="green"
                                    stroke-width="3"
                                    stroke-dasharray="157"
                                    stroke-dashoffset="157"
                                >
                                    <animate
                                        attributeName="stroke-dashoffset"
                                        from="157"
                                        to="0"
                                        dur="0.6s"
                                        fill="freeze"
                                    />
                                </circle>

                                <path
                                    fill="none"
                                    stroke="green"
                                    stroke-width="4"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M14 27l7 7 16-16"
                                    stroke-dasharray="45"
                                    stroke-dashoffset="45"
                                >
                                    <animate
                                        attributeName="stroke-dashoffset"
                                        from="45"
                                        to="0"
                                        begin="0.6s"
                                        dur="0.4s"
                                        fill="freeze"
                                    />
                                </path>
                            </svg>
                            :
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="red"
                                stroke-width="3"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                width="50"
                                height="50"
                            >
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        }
                    </section>
                </>}
            </section>
            <Button onClick={() => { setAvailability(true) }}>Post Your Availability</Button>
        </section>
    </>
}