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
  const [authMode, setAuthMode] = useState("signin"); // "signin" or "signup"

  function handleSignOut() {
    dispatch(setUser(null));
    localStorage.removeItem("user");
    message.success("SignOut Successful");
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
    <header className="sticky top-0 left-0 right-0 w-full h-20 bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-8 flex justify-between items-center z-50 transition-all">
      
      {/* Brand Logo & Name */}
      <div 
        onClick={() => navigate('/')} 
        className="flex items-center gap-3 cursor-pointer group"
      >
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-teal-500/20 group-hover:scale-105 transition-transform duration-200">
          <HeartPulse className="w-6 h-6 text-slate-950" />
        </div>
        <div>
          <span className="text-xl font-black tracking-tight text-white flex items-center gap-1">
            Medi<span className="text-teal-400">Trust</span>
          </span>
          <span className="text-[10px] text-slate-400 font-medium block -mt-1 tracking-wider uppercase">
            Healthcare Network
          </span>
        </div>
      </div>

      {/* Quick Nav Links */}
      <div className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-semibold text-slate-400">
        <button 
          onClick={() => navigate('/home')}
          className="hover:text-teal-400 transition-colors cursor-pointer"
        >
          Dashboard
        </button>
        <button 
          onClick={() => navigate('/hospitals')}
          className="hover:text-teal-400 transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <Building2 className="w-4 h-4 text-teal-500" />
          Hospitals
        </button>
      </div>

      {/* Navigation & Auth Section */}
      <div className="flex items-center gap-4">
        {currentUser ? (
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => {
                if (currentUser.role === 'doctor') {
                  navigate(`/doctorControls/${currentUser.id}`);
                } else if (currentUser.role === 'admin') {
                  navigate(`/doctorrole/${currentUser.id}`);
                } else {
                  navigate('/home');
                }
              }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 text-xs sm:text-sm font-semibold border border-slate-700/60 transition-colors shadow-sm"
            >
              {currentUser.role === 'doctor' ? (
                <Stethoscope className="w-4 h-4 text-teal-400" />
              ) : (
                <UserIcon className="w-4 h-4 text-teal-400" />
              )}
              <span>Hello, {currentUser.name || 'User'}</span>
            </button>

            <button
              onClick={handleSignOut}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs sm:text-sm font-semibold border border-rose-500/20 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2.5">
            <button
              onClick={openSignIn}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-200 hover:text-white transition-colors cursor-pointer"
            >
              Sign In
            </button>
            
            <button
              onClick={openSignUp}
              className="px-4 py-2.5 text-xs sm:text-sm font-bold bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 rounded-xl shadow-lg shadow-teal-500/20 transition-all duration-200 active:scale-[0.98] cursor-pointer"
            >
              Get Started
            </button>
          </div>
        )}
      </div>

      {/* Auth Modal wrapping the LoginCard */}
      <Modal
        open={authModalOpen}
        onCancel={() => setAuthModalOpen(false)}
        footer={null}
        centered
        width={460}
        styles={{ body: { padding: 0 } }}
        modalRender={(modalContent) => (
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