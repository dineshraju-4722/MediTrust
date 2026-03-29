import { Button, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { PostAppointment } from "../../apiCalls/AppointmentsCalls";
import { Navbar } from "../commonComponents/Navbar";
import moment from "moment";

export default function PostingPage() {
    const { date, doctid, userid, time } = useParams();
    const navigate=useNavigate();



    const appointmentData = {
        appointmentTime: time,
        appointmentDate: date,
        docter: parseInt(doctid),
        user: parseInt(userid)
    };

    async function func() {
        console.log(appointmentData)
        try {
            const res = await PostAppointment(appointmentData);
            console.log(res)
            message.success('Slot Booked,Will Appear in HomePage')
            navigate(`/doctor/${doctid}/${date}`)
        }
        catch (err) {
            message.error(err)
        }

    }


    return <>
        <Navbar />
        <section className="w-[100vw] h-[78vh] flex flex-col justify-center  items-center font-bold">
            <p className=" text-center">You want to Book Appointment for this Slot:</p>
            <p className="mb-[1rem]">{moment(date).format("Do MMM")},{moment(time,"HH;mm:ss").format("hh:mm A")}</p>
            <Button type="primary" onClick={() => {
                func()
            }}>Book Now</Button>
        </section>

    </>
}