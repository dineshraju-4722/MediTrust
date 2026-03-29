import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HospitalViewDoctors({ specializations, doctors }) {
    const navigate = useNavigate();

    const [doctSearch, setDoctSearch] = useState('');
    const [tempDocters, setTempDoctors] = useState([]);




    function HandleDoctorFilter(id) {
        setTempDoctors(doctors.filter(e => e.specialization.id == id));
    }



    useEffect(() => {
        setTempDoctors([...doctors]);
    }, [doctors])

    return <section className="border-box p-[4vw] ">
        {specializations.length != 0 && <section className="flex  gap-x-[3vw] text-[13px] w-[100%] overflow-scroll">
            {specializations.map(spec => { return <span onClick={() => { HandleDoctorFilter(spec.id) }} className="border border-yellow-500 rounded border-box py-[0.1rem] px-[0.4rem] h-[2rem]">{spec.Name}</span> })}

        </section>
        }

        <input type="text" placeholder="Search Docters" className="mt-[1rem] mb-[1rem] w-[40vw] " onChange={(e) => setDoctSearch(e.target.value)} />

        {tempDocters.length != 0 && <section className="w-[100%] bg-white bg-white border-box p-[1vw] max-h-[90vh] overflow-scroll">
            {tempDocters.filter(e => doctSearch === '' || e.name.toLowerCase().includes(doctSearch.toLowerCase())).map(doctor => {
                return <p className="hover:underline" onClick={() => navigate(`/doctor/${doctor.id}/${moment().format("YYYY-MM-DD")}`)}>{doctor.name}</p>
            }
            )}
        </section>}
    </section>
}