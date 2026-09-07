import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  Stethoscope, 
  ShieldCheck, 
  ArrowRight, 
  Loader2, 
  AlertCircle, 
  CheckCircle2,
  Sparkles
} from "lucide-react";
import { setUser } from "../../redux/UserRedux";
import { loginData, signUpData } from "../../apiCalls/UserCalls";

export default function LoginCard({ initialMode = "signin", onSuccessModalClose }) {
  const [isSignIn, setIsSignIn] = useState(initialMode === "signin");
  const [role, setRole] = useState("user"); // 'user' or 'doctor'
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (errorMsg) setErrorMsg("");
  };

  const handleQuickFill = (selectedRole) => {
    setRole(selectedRole);
    if (selectedRole === "doctor") {
      setFormData({
        name: "Dr. Sarah Jenkins",
        email: "doctor@meditrust.com",
        password: "password123",
      });
    } else {
      setFormData({
        name: "John Doe",
        email: "patient@meditrust.com",
        password: "password123",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!formData.email || !formData.password) {
      setErrorMsg("Please enter both email and password.");
      return;
    }

    if (!isSignIn && !formData.name) {
      setErrorMsg("Please enter your full name.");
      return;
    }

    setLoading(true);

    try {
      if (isSignIn) {
        // Sign In Flow
        const res = await loginData({
          email: formData.email,
          password: formData.password,
        });

        if (res && (res.name || res.id || res.email)) {
          localStorage.setItem("user", JSON.stringify(res));
          dispatch(setUser(res));
          setSuccessMsg("Logged in successfully! Redirecting...");
          
          if (onSuccessModalClose) {
            onSuccessModalClose();
          }

          setTimeout(() => {
            if (res.role === "doctor") {
              navigate(`/doctorControls/${res.id}`);
            } else if (res.role === "admin") {
              navigate("/doctorrole/" + res.id);
            } else {
              navigate("/home");
            }
          }, 800);
        } else {
          setErrorMsg("Invalid credentials. Please check your details.");
        }
      } else {
        // Sign Up Flow
        const payload = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: role,
        };
        const res = await signUpData(payload);
        
        setSuccessMsg("Account created successfully! Switching to Sign In...");
        setTimeout(() => {
          setIsSignIn(true);
          setSuccessMsg("");
          setFormData((prev) => ({ ...prev, password: "" }));
        }, 1500);
      }
    } catch (err) {
      console.error(err);
      if (!isSignIn) {
        setErrorMsg(err.response?.data?.message || "User already exists or registration failed.");
      } else {
        setErrorMsg(err.response?.data?.message || "Invalid email or password.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-3xl shadow-2xl p-6 sm:p-8 transition-all duration-300 relative overflow-hidden">
      {/* Top Accent Gradient Bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-600" />

      {/* Background Decorative Glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header & Tab Switcher */}
      <div className="mb-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold mb-3 border border-teal-200/60">
          <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
          <span>Secure MediTrust Authentication</span>
        </div>
        <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">
          {isSignIn ? "Welcome Back" : "Create an Account"}
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          {isSignIn
            ? "Access your personalized healthcare portal"
            : "Join MediTrust for smart appointments & health management"}
        </p>
      </div>

      {/* Sign In / Sign Up Mode Toggle */}
      <div className="grid grid-cols-2 p-1 bg-slate-100/90 rounded-2xl mb-6">
        <button
          type="button"
          onClick={() => {
            setIsSignIn(true);
            setErrorMsg("");
            setSuccessMsg("");
          }}
          className={`py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200 ${
            isSignIn
              ? "bg-white text-teal-700 shadow-md shadow-teal-900/5"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          Sign In
        </button>
        <button
          type="button"
          onClick={() => {
            setIsSignIn(false);
            setErrorMsg("");
            setSuccessMsg("");
          }}
          className={`py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200 ${
            !isSignIn
              ? "bg-white text-teal-700 shadow-md shadow-teal-900/5"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          Register
        </button>
      </div>

      {/* Notification Alerts */}
      {errorMsg && (
        <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm flex items-start gap-2 animate-fadeIn">
          <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs sm:text-sm flex items-start gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Role Selector (visible during Sign Up) */}
        {!isSignIn && (
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
              I am joining as:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole("user")}
                className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all text-left ${
                  role === "user"
                    ? "border-teal-500 bg-teal-50/60 text-teal-900 ring-2 ring-teal-500/20 font-semibold"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                <div className={`p-1.5 rounded-lg ${role === "user" ? "bg-teal-500 text-white" : "bg-slate-100 text-slate-500"}`}>
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold">Patient</div>
                  <div className="text-[10px] text-slate-500">Book Care</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setRole("doctor")}
                className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all text-left ${
                  role === "doctor"
                    ? "border-teal-500 bg-teal-50/60 text-teal-900 ring-2 ring-teal-500/20 font-semibold"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                <div className={`p-1.5 rounded-lg ${role === "doctor" ? "bg-teal-500 text-white" : "bg-slate-100 text-slate-500"}`}>
                  <Stethoscope className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold">Doctor</div>
                  <div className="text-[10px] text-slate-500">Manage Practice</div>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Full Name Input (Sign Up Only) */}
        {!isSignIn && (
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Dr. John Smith / Jane Doe"
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50/80 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-slate-800 transition-all placeholder:text-slate-400"
                required={!isSignIn}
              />
            </div>
          </div>
        )}

        {/* Email Input */}
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="you@example.com"
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50/80 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-slate-800 transition-all placeholder:text-slate-400"
              required
            />
          </div>
        </div>

        {/* Password Input */}
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="••••••••"
              className="w-full pl-10 pr-11 py-2.5 text-sm bg-slate-50/80 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-slate-800 transition-all placeholder:text-slate-400"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-semibold text-sm rounded-xl shadow-lg shadow-teal-600/25 flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <span>{isSignIn ? "Sign In to MediTrust" : "Create Account"}</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Quick Fill Demo Helpers */}
      <div className="mt-6 pt-5 border-t border-slate-100">
        <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
          <span className="flex items-center gap-1 font-medium text-slate-500">
            <Sparkles className="w-3 h-3 text-amber-500" />
            Quick Demo Fill:
          </span>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => handleQuickFill("user")}
            className="flex-1 py-1.5 px-2 bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-600 text-xs rounded-lg transition-all text-center border border-slate-200/60 font-medium"
          >
            Fill Patient Demo
          </button>
          <button
            type="button"
            onClick={() => handleQuickFill("doctor")}
            className="flex-1 py-1.5 px-2 bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-600 text-xs rounded-lg transition-all text-center border border-slate-200/60 font-medium"
          >
            Fill Doctor Demo
          </button>
        </div>
      </div>

      {/* Footer message */}
      <p className="text-center text-xs text-slate-400 mt-5">
        By continuing, you agree to MediTrust’s Terms of Care & Privacy Policy.
      </p>
    </div>
  );
}
