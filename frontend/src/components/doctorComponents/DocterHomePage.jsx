import { useEffect, useState } from "react";
import { Button, Form, Modal, Select, Input, message } from "antd";
import { PostDocterDetails } from "../../apiCalls/DocterPageCalls";
import { getSpecialistsNames } from "../../apiCalls/UserCalls";
import { GetAllHospitals } from "../../apiCalls/HospitalCalls";
import { useNavigate } from "react-router-dom";
import { getDocterByEmail } from "../../apiCalls/DocterCalls";
import { useSelector } from "react-redux";
import { Navbar } from "../commonComponents/Navbar";

export default function DocterHomePage() {
    const currentUser = useSelector((state) => state.user.currentUser);
    const navigate = useNavigate();

    const [register, setRegister] = useState(false)
    const [specialization, setSpecializations] = useState([])
    const [docter, setDocter] = useState({})
    const [hospitals, setHospitals] = useState([])
    const [request, setRequest] = useState(false)
    async function DoctorPostRegister(data) {
        try {
            const res = await PostDocterDetails(data);

            setRegister(false)
        }
        catch (err) {
            message.error(err)
        }
    }

    useEffect(() => {
        async function func() {
            try {
                const res = await getDocterByEmail(currentUser.email);
                setDocter(res)
                console.log(res)
                if (res === null) {
                    setRequest(false)
                }

                if (res.status === "true") {
                    message.success('loggined as doctor')
                    navigate(`/doctorrole/${res.id}`)

                }
                else if (res.status === "false") {
                    //  setAccept(false);
                    message.info("Not accepted Yet")
                    setRequest(true)
                }
            }
            catch (err) {
                message.error(err)
            }

            const res1 = await getSpecialistsNames();
            setSpecializations(res1);

            const res2 = await GetAllHospitals();
            setHospitals(res2);

        }
        func()
    }, [register])



    return <>
        <Navbar />
        <section className="flex flex-col w-[100vw] h-[80vh] justify-center items-center">
            {!request &&

                <section className="flex flex-col justify-center items-center font-bold ">
                    <p className="mb-[1rem]">You have Created account, Now request to be an Doctor</p>
                    <Button onClick={() => { setRegister(true) }}>Make Requset for Doctor</Button>
                </section>
            }

            <Modal title="Register"
                open={register}
                onCancel={() => setRegister(false)}
                footer={null}
                centered>
                <Form
                    layout="vertical"
                    onFinish={DoctorPostRegister}
                    className="w-[25rem] bg-white p-6 rounded-xl shadow-md"
                >

                    <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please enter doctor name" }]}>
                        <Input placeholder="Enter doctor's name" />
                    </Form.Item>

                    <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please enter email" }]}>
                        <Input type="email" placeholder="Enter email" />
                    </Form.Item>



                    <Form.Item label="Contact Number" name="contact" rules={[{ required: true, message: "Please enter contact" }]}>
                        <Input placeholder="Enter contact number" />
                    </Form.Item>

                    <Form.Item label="Experience" name="experience" rules={[{ required: true, message: "Please enter experience" }]}>
                        <Input placeholder="e.g. 5 years in cardiology" />
                    </Form.Item>

                    <Form.Item label="Image URL" name="imglink">
                        <Input placeholder="Paste profile image link" />
                    </Form.Item>

                    {/* Dropdowns */}
                    <Form.Item label="Specialization" name="specializationId" rules={[{ required: true, message: "Select specialization" }]}>
                        <Select placeholder="Select specialization">
                            {specialization.length != 0 && specialization.map((spec) => (
                                <Option key={spec.id} value={spec.id}>
                                    {spec.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item label="Hospital" name="hospitalId" rules={[{ required: true, message: "Select hospital" }]}>
                        <Select placeholder="Select hospital">
                            {hospitals.map((h) => (
                                <Option key={h.id} value={h.id}>
                                    {h.name} , {h.location}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" >
                            Register Doctor
                        </Button>
                    </Form.Item>
                </Form>

            </Modal>
            {docter.name !== undefined && <>
                <p className="font-bold underline text-xl px-[3vw] mb-[2rem]">you Requested Details to be a Doctor</p>

                <section className="flex flex-col">

                    <p> <b> Name </b> :    {docter.name}</p>
                    <p><b> email</b> : {docter.email}</p>
                    <p><b> contact </b>: {docter.contact}</p>
                    <p><b> hospital </b>: {docter.hospital.name}</p>
                    <p><b> specialization</b> : {docter.specialization.name}</p>
                    <p><b>  experience</b> : {docter.experience}</p>
                    <section className="flex">

                        status:{docter.status === "true" ?
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
                </section>

            </>
            }

        </section>


    </>
}