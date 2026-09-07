import { useEffect, useState } from "react"
import { Navbar } from "../commonComponents/Navbar";
import { getDoctersByType } from "../../apiCalls/DocterCalls";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { Button, Rate } from "antd";

export const DoctersList = () => {

    const navigate = useNavigate();
    const { specialist } = useParams();
    const [docters, setDocters] = useState([]);

    useEffect(() => {
        const func = async () => {
            const res = await getDoctersByType(specialist);
            if (res) {
                const res1 = res.filter(e => e.status == "false");
                console.log(res1);
                setDocters(res1);
            }

        }
        func();
    }, [])
    return <>

        <Navbar />
        {console.log(docters)}

        <section className=" w-[100vw]  py-[3rem]">

            {docters.length != 0 && <>
                {docters.map(docter => {
                    return <section className="w-[90vw]  bg-white m-auto flex items-center py-[0.5rem] px-[5vw] mb-[1rem] rounded-md">
                        <img src={docter.imglink} className="h-[8rem] w-[8rem] bg-yellow-500 rounded-[50%] mr-[5vw]" />
                        <section className="flex flex-col flex-wrap h-[100%] justify-center  w-[100%]">
                            <article className="flex  flex-wrap items-center justify-between mb-[0.7rem] w-[100%]">
                                <p className="text-3xl font-bold ">{docter.name}</p>
                                <section className="flex flex-wrap text-sky-500">
                                    <span className="text-xl"><i class="ri-stethoscope-fill"></i> </span>
                                    <p>{docter.specialization.name}</p>
                                </section>
                            </article>
                            <article className="  flex flex-wrap">
                                <section className="mr-[1rem]">
                                    <span className="mr-[0.5rem] text-xl"><i class="ri-police-badge-fill"></i></span>
                                    <span>{docter.experience} Years of experience</span>
                                </section>
                                <section className="mr-[1rem] hover:underline" onClick={() => { navigate(`/hospital/${docter.hospital.id}`) }}>
                                    <span className="mr-[0.5rem] text-xl"><i class="ri-hospital-line"></i></span>
                                    <span >{docter.hospital.name}</span>
                                </section>
                                <section className="mr-[1rem]">
                                    <span className="mr-[0.5rem] text-xl"><i class="ri-map-pin-line"></i></span>
                                    <span>{docter.hospital.location}</span>
                                </section>

                            </article>
                            <section className="my-[1rem]">
                                <Rate value={docter.averageRating}  >Rating:</Rate>
                                <span className="ml-[0.5rem] ">{docter.averageRating}</span>
                            </section>
                            <Button className=" mt-[0.5rem] w-[35vw]" type="primary" onClick={() => { navigate(`/doctor/${docter.id}/${moment().format('YYYY-MM-DD')}`) }}>Book appointment</Button>
                        </section>
                    </section>
                })}


            </>}
        </section>


    </>
}