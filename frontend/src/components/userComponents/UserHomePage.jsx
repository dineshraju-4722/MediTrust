import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
// import { setUser } from "../../redux/UserRedux"
import { getAppointmentsByUser, getSpecialistsNames } from "../../apiCalls/UserCalls";
import { Navbar } from "../commonComponents/Navbar";
import { useNavigate } from "react-router-dom";
import moment from "moment";


export const UserHomePage = () => {
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.user.currentUser);
    const [appointments, setAppointments] = useState([]);
    const [specialists, ssetSpecialists] = useState([]);
    

    const handleChange = (e) => {
        const val = e.target.value;

        const match = specialists.find(
            (spec) =>  spec.Name.toLowerCase() === val.toLowerCase()
        );
        if (match) {
            console.log("mat")
            navigate(`/doctors/${match.Name}`);
        }
    };



    useEffect(() => {
        const func = async () => {
            if (currentUser != null) {
                const res = await getAppointmentsByUser(currentUser.id);
                setAppointments(res);
            }

            const res1 = await getSpecialistsNames();
            ssetSpecialists(res1);
        }
        func();
    }, [currentUser])









    return <main className="h-[100vh] w-[100vw] " class="backgrund">
        <Navbar />
        
        {console.log(appointments)}
        {console.log(specialists)}

        <section className="flex justify-between  mt-[5rem] mainpage">
            <input type="text" list="specialists" placeholder="Search For Specialists" className="inputspec outline-none w-[30vw] h-[3rem] bg-white  rounded-md flex items-center" onChange={handleChange} />
            <datalist id="specialists" >
                {specialists.length !== 0 &&
                    specialists.map((e, index) => (
                        <option key={index} value={e.Name} >
                            {e.Name}
                        </option>
                    ))}

            </datalist>
           


            <section className="history p-[1rem] bg-sky-200 w-[25rem] h-[70vh]  rounded-md overflow-scroll scrollbar-hide">
                <p className="text-xl mb-[1rem] ">Previous Appointments</p>

                {appointments.length!=0 ? appointments.map(e => {
                    return <article className="bg-white mb-[0.5rem] p-[0.5rem] rounded-md ">
                        <section className="flex justify-between">
                            <span className="mr-[0.2rem]">{e.doctorName}({e.specializationName})</span>
                            {moment(`${e.date} ${e.time}`, "YYYY-MM-DD HH:mm:ss").isSameOrAfter(moment())  && <p className ="text-green-500 border border-green-500 p-[0.1rem] rounded-md">Upcoming</p>}
                            
                        </section>
                        <section className="flex ">
                            <p className="mr-[2rem]">{moment(e.date).format("MMM Do")}  ,{moment(e.time, "hh:mm:ss").format("hh:mm A")}</p>
                            <p>{e.hospitalName}</p>
                        </section>
                    </article>
                }):<>
                    <p className="w-[100%] h-[90%] flex bg-white justify-center items-center text-xl font-bold">No Appointments</p>
                </>}

            </section>

        </section>
    </main>
}