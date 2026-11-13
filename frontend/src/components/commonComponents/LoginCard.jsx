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
  CheckCircle2
} from "lucide-react";
import { setUser } from "../../redux/UserRedux";
import { loginData, signUpData } from "../../apiCalls/UserCalls";

export default function LoginCard({ initialMode = "signin", onSuccessModalClose }) {
  const [isSignIn, setIsSignIn] = useState(initialMode === "signin");
  const [role, setRole] = useState("user");
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

  const fillQuickCredentials = (targetRole) => {
    setRole(targetRole);
    if (targetRole === "doctor") {
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
        const res = await loginData({
          email: formData.email,
          password: formData.password,
        });

        if (res && (res.name || res.id || res.email)) {
          localStorage.setItem("user", JSON.stringify(res));
          dispatch(setUser(res));
          setSuccessMsg("Signed in successfully.");

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
          }, 600);
        } else {
          setErrorMsg("Invalid credentials. Please verify your email and password.");
        }
      } else {
        const payload = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: role,
        };
        await signUpData(payload);

        setSuccessMsg("Account created successfully. You can now sign in.");
        setTimeout(() => {
          setIsSignIn(true);
          setSuccessMsg("");
          setFormData((prev) => ({ ...prev, password: "" }));
        }, 1200);
      }
    } catch (err) {
      if (!isSignIn) {
        setErrorMsg(err.response?.data?.message || "Registration failed. Email may already be registered.");
      } else {
        setErrorMsg(err.response?.data?.message || "Invalid credentials.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-xl p-6 sm:p-8">
      <div className="mb-6">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-teal-500/10 text-teal-400 text-xs font-semibold mb-3">
          <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
          <span>MediTrust Account Access</span>
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          {isSignIn ? "Sign In" : "Create Account"}
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          {isSignIn
            ? "Enter your credentials to access your appointments and care records."
            : "Sign up to schedule appointments with specialists."}
        </p>
      </div>

      <div className="grid grid-cols-2 p-1 bg-slate-950 rounded-xl mb-5 border border-slate-800/80">
        <button
          type="button"
          onClick={() => {
            setIsSignIn(true);
            setErrorMsg("");
            setSuccessMsg("");
          }}
          className={`py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            isSignIn
              ? "bg-slate-800 text-white shadow-sm"
              : "text-slate-400 hover:text-slate-200"
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
          className={`py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            !isSignIn
              ? "bg-slate-800 text-white shadow-sm"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          Register
        </button>
      </div>

      {errorMsg && (
        <div className="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="mb-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-start gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <span>{successMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isSignIn && (
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-400">Account Type</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRole("user")}
                className={`p-2.5 rounded-lg border text-left flex items-center gap-2 cursor-pointer transition-colors ${
                  role === "user"
                    ? "border-teal-500 bg-teal-500/10 text-white"
                    : "border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700"
                }`}
              >
                <User className="w-4 h-4 text-teal-400" />
                <span className="text-xs font-semibold">Patient</span>
              </button>

              <button
                type="button"
                onClick={() => setRole("doctor")}
                className={`p-2.5 rounded-lg border text-left flex items-center gap-2 cursor-pointer transition-colors ${
                  role === "doctor"
                    ? "border-teal-500 bg-teal-500/10 text-white"
                    : "border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700"
                }`}
              >
                <Stethoscope className="w-4 h-4 text-teal-400" />
                <span className="text-xs font-semibold">Doctor</span>
              </button>
            </div>
          </div>
        )}

        {!isSignIn && (
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Full name"
                className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-teal-500"
                required={!isSignIn}
              />
            </div>
          </div>
        )}

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Email Address</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="name@example.com"
              className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-teal-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="••••••••"
              className="w-full pl-9 pr-10 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-teal-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 px-4 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Please wait...</span>
            </>
          ) : (
            <>
              <span>{isSignIn ? "Sign In" : "Create Account"}</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
        <span>Test accounts:</span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => fillQuickCredentials("user")}
            className="text-teal-400 hover:underline cursor-pointer"
          >
            Patient demo
          </button>
          <span className="text-slate-600">|</span>
          <button
            type="button"
            onClick={() => fillQuickCredentials("doctor")}
            className="text-teal-400 hover:underline cursor-pointer"
          >
            Doctor demo
          </button>
        </div>
      </div>
    </div>
  );
}
