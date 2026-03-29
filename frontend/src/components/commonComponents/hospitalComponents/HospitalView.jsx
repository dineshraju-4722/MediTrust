import { useEffect, useState } from "react";
import { Navbar } from "../Navbar";
import { getSpecialistsNames } from "../../../apiCalls/UserCalls";
import { GetHospitalById } from "../../../apiCalls/HospitalCalls";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import HospitalViewDoctors from "./HospitalViewDoctors";

export default function HospitalView() {
    const [hospital, setHospital] = useState({});
    const [specializations, setSpecializations] = useState([]);
    const [doctors, setDoctors] = useState([]);

    const { id } = useParams();

    const navigate = useNavigate();




    useEffect(() => {
        async function func() {
            const spec = await getSpecialistsNames();
            setSpecializations(spec);

            const hosp = await GetHospitalById(id);
            setHospital(hosp);

            setDoctors(hosp.docters)
        }

        func();
    }, [])

    return <>
        <Navbar />


        {hospital.name != '' && <> <section className="w-[100vw]  px-[4vw] py-[3vw] flex justify-between  docterpage">
            <section className="flex flex-col  rounded-md bg-white p-[2vw] doctertabs"  >
                <section className=" flex items-center mb-[2rem] gap-[4vw] img-handling">
                    <img src="#" className="h-[8rem] w-[8rem] bg-green-500 rounded-[50%] " />
                    <section className="flex flex-col justify-between h-[6rem]">
                        <p className="text-2xl font-bold ">{hospital.name}</p>
                        <section className="flex text-sky-500 ">
                            <span className="text-xl"><i class="ri-stethoscope-fill"></i> </span>
                        </section>
                        <section>
                            <span className="mr-[1rem] "><i class="ri-police-badge-fill"></i></span>
                            <span>{hospital.location} </span>
                        </section>
                        <span>{hospital.location} </span>
                    </section>
                </section>
                {/* <section className="flex flex-col gap-[1rem]">

                    <section className="flex text-sm">
                        <Rate value={docter.averageRating} disabled></Rate>
                        <span className="ml-[1rem]">({docter.averageRating})</span>
                    </section>
                    <section className="mr-[1rem] hover:underline" onClick={() => { navigate(`/hospital/${docter.hospital.id}`) }}>
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


                </section> */}
            </section>
        </section>
         <HospitalViewDoctors specializations={specializations} doctors={doctors} />
         </>
        }




        {/* 
        {
            // console.log(specializations)
            console.log(hospital)
            // console.log(doctors)
        } */}




    </>
}