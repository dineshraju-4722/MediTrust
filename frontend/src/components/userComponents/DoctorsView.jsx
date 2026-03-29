import { useEffect, useState } from "react"
import { Navbar } from "../commonComponents/Navbar"
import { Button, message, Rate } from "antd";
import { getAppoinByDateAndDoctor, getDocter, postreviewcall } from "../../apiCalls/DocterCalls";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";

export const DoctorsView = () => {

    const { id, date } = useParams();
    const [docter, setDocter] = useState({});
    const [appointments, setAppointments] = useState([]);
    const [rating, setRating] = useState(0);
    const [ref, setRef] = useState(true);
    const currentUser = useSelector((state) => state.user.currentUser);
    const navigate = useNavigate();
    function checkingSignIn(dateFunc, doctid, userid, starttime) {

        navigate(`/booking/${dateFunc}/${doctid}/${userid}/${starttime}`)
    }

    async function postreview(rating, userid, doctid) {
        const jsonbody = {
            "rating": rating,
            "docterid": doctid,
            "userid": userid
        }
        const res = await postreviewcall(jsonbody);
        setRef(!ref);
        message.success('Rating posted')
    }
    useEffect(() => {
        const func = async () => {
            const doctorDetails = await getDocter(id);
            setDocter(doctorDetails);
            if (!doctorDetails) {
              
                setRating(0);
            }

            // docter.userRating
            const appointments = await getAppoinByDateAndDoctor(id, date);
            setAppointments(appointments);
            // if(docter.){}
        }
        func();
    }, [ref])

    return <>
        <Navbar />
        {/* {console.log()} */}

        {docter.name !== undefined &&

            <section className="w-[100vw]  px-[4vw] py-[3vw] flex justify-between  docterpage">
                <section className="flex flex-col  rounded-md bg-white p-[2vw] doctertabs"  >
                    <section className=" flex items-center mb-[2rem] gap-[4vw] img-handling">
                        <img src={docter.imglink} className="h-[8rem] w-[8rem] bg-green-500 rounded-[50%] " />
                        <section className="flex flex-col justify-between h-[6rem]">
                            <p className="text-2xl font-bold ">{docter.name}</p>
                            <section className="flex text-sky-500 ">
                                <span className="text-xl"><i class="ri-stethoscope-fill"></i> </span>
                                <p>{docter.specialization.name}</p>
                            </section>
                            <section>
                                <span className="mr-[1rem] "><i class="ri-police-badge-fill"></i></span>
                                <span>{docter.experience} Years of Experience</span>
                            </section>
                        </section>
                    </section>
                    <section className="flex flex-col gap-[1rem]">

                        <section className="flex text-sm">
                            <Rate value={docter.averageRating} disabled></Rate>
                            <span className="ml-[1rem]">({docter.averageRating})</span>
                        </section>
                        <section className="mr-[1rem] hover:underline" onClick={()=>{navigate(`/hospital/${docter.hospital.id}`)}}>
                            <span className="text-xl mr-[1rem] "><i class="ri-hospital-line"></i></span>
                            <span>{docter.hospital.name}</span>
                        </section>

                        <section>
                            <span className="text-xl mr-[1rem]"><i class="ri-map-pin-line"></i></span>
                            <span>{docter.hospital.location}</span>
                        </section>


                        <section className="flex flex-wrap">
                            <article className="mr-[1rem]">
                                <span className="text-xl mr-[1rem] "><i class="ri-phone-fill"></i></span>
                                <span>{docter.contact}</span>
                            </article>
                            <article className="flex flex-wrap">
                                <span className="text-xl mr-[1rem]"><i class="ri-mail-line"></i></span>
                                <span>{docter.email}</span>
                            </article>
                        </section>

                        <hr></hr>
                        <section>
                            {docter.userRating == 0 ? <p>Give Rating</p> : <p>Your Rating</p>}
                            <Rate value={rating || docter.rating} onChange={setRating}></Rate>
                            <Button className="ml-[1rem]" onClick={() => { currentUser != null ? postreview(rating, currentUser.id, docter.id) : message.info('login To give Rating to a doctor') }}>Post review</Button>
                        </section>


                    </section>
                </section>
                <section className=" bg-white rounded-md p-[2vw] doctertabs">

                    {appointments !== undefined && <>
                        <p className="font-bold text-xl mb-[0.5rem]">Available Time Slots for  {moment(date).format("MMM Do")}</p>
                        <p className="text-sm mb-[1rem] text-yellow-500">Chance is less for exceeded appointments</p>
                        <section className="flex flex-col  overflow-scroll">
                            {appointments.map(ele => {

                                return <article className="flex justify-between bg-sky-200 p-[0.3rem] rounded-md" onClick={() => { currentUser != null ? checkingSignIn(date, docter.id, currentUser.id, ele.startTime) : message.info('login To Apply') }}><p>{moment(ele.startTime, "HH:mm").format("hh:mm A")} - {moment(ele.endTime, "HH:mm:ss").format("hh:mm A")}</p>  <p>({ele.bookedAppointments}/{ele.maxAppointments}) Appointments</p></article>
                            })}

                        </section>
                    </>
                    }
                </section>
            </section>
        }
    </>
}