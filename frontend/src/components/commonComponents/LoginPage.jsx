import { useState } from "react";

import { Navbar } from "./Navbar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const currentUser = useSelector((state) => state.user.currentUser);
    const navigate = useNavigate();
    return <section class="login-page w-[100vw] h-[100vh]">
        <Navbar />
        <section className="flex flex-col  w-[100%] h-[79%] justify-end items-center ">
            <section  onClick={() => { currentUser != null && currentUser.role == "doctor" ? navigate(`/doctorControls/${currentUser.id}`) : navigate(`/home`) }}>
                <button className="bg-green-400 p-[0.5rem] rounded-md" >Get Started</button>
            </section>
        </section>
    </section>
}