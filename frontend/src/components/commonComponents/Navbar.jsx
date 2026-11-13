import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, message } from "antd";
import { setUser } from "../../redux/UserRedux";
import { useNavigate } from "react-router-dom";
import LoginCard from "./LoginCard";
import { HeartPulse, LogOut, User as UserIcon, Stethoscope, Building2 } from "lucide-react";

export const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("signin");

  function handleSignOut() {
    dispatch(setUser(null));
    localStorage.removeItem("user");
    message.success("Signed out successfully");
    navigate("/");
  }

  const openSignIn = () => {
    setAuthMode("signin");
    setAuthModalOpen(true);
  };

  const openSignUp = () => {
    setAuthMode("signup");
    setAuthModalOpen(true);
  };

  return (
    <header className="sticky top-0 left-0 right-0 w-full h-18 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-8 flex justify-between items-center z-50">
      <div 
        onClick={() => navigate("/")} 
        className="flex items-center gap-3 cursor-pointer group"
      >
        <div className="w-9 h-9 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
          <HeartPulse className="w-5 h-5" />
        </div>
        <div>
          <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1">
            Medi<span className="text-teal-400">Trust</span>
          </span>
          <span className="text-[10px] text-slate-400 font-medium block -mt-1 tracking-wider uppercase">
            Healthcare Network
          </span>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-slate-400">
        <button 
          onClick={() => navigate("/home")}
          className="hover:text-white transition-colors cursor-pointer"
        >
          Appointments
        </button>
        <button 
          onClick={() => navigate("/hospitals")}
          className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <Building2 className="w-4 h-4 text-teal-400" />
          Hospitals
        </button>
      </div>

      <div className="flex items-center gap-3">
        {currentUser ? (
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (currentUser.role === "doctor") {
                  navigate(`/doctorControls/${currentUser.id}`);
                } else if (currentUser.role === "admin") {
                  navigate(`/doctorrole/${currentUser.id}`);
                } else {
                  navigate("/home");
                }
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs sm:text-sm font-medium border border-slate-800 transition-colors"
            >
              {currentUser.role === "doctor" ? (
                <Stethoscope className="w-4 h-4 text-teal-400" />
              ) : (
                <UserIcon className="w-4 h-4 text-teal-400" />
              )}
              <span>{currentUser.name || "My Account"}</span>
            </button>

            <button
              onClick={handleSignOut}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-medium border border-rose-500/20 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={openSignIn}
              className="px-3.5 py-1.5 text-xs sm:text-sm font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              Sign In
            </button>
            
            <button
              onClick={openSignUp}
              className="px-3.5 py-1.5 text-xs sm:text-sm font-semibold bg-teal-500 hover:bg-teal-400 text-slate-950 rounded-lg transition-colors cursor-pointer"
            >
              Register
            </button>
          </div>
        )}
      </div>

      <Modal
        open={authModalOpen}
        onCancel={() => setAuthModalOpen(false)}
        footer={null}
        centered
        width={440}
        styles={{ body: { padding: 0 } }}
        modalRender={() => (
          <div className="p-0 bg-transparent shadow-none border-none">
            <LoginCard 
              initialMode={authMode} 
              onSuccessModalClose={() => setAuthModalOpen(false)} 
            />
          </div>
        )}
      />
    </header>
  );
};
