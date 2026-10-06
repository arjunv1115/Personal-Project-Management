import { useState } from "react";
import { FolderKanban, Mail, Lock, User, Eye, EyeOff, ArrowRight, CheckCircle2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function AuthPage() {
  const { login, register } = useAuth();
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (mode === "signup") {
      if (!name.trim()) {
        setError("Please enter your full name.");
        return;
      }

      if (!email.trim()) {
        setError("Please enter your email address.");
        return;
      }

      if (!password) {
        setError("Please enter your password.");
        return;
      }

      const result = register({name, email, password});

      if (!result.success) {
        setError(result.message);
        return;
      }
      setSuccess(result.message);
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    const result = login({email,password});

    if (!result.success) {
      setError(result.message);
      return;
    }
    setSuccess(result.message);
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setError("");
    setSuccess("");
    setName("");
    setEmail("");
    setPassword("");

    setShowPassword(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* LEFT SIDE */}
        <div className="hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-700 p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-lg">
                <FolderKanban size={23} />
              </div>
              <div>
                <h1 className="text-lg font-bold">
                  ProjectHub
                </h1>
                <p className="text-xs text-indigo-200">
                  Personal Workspace
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-lg">
            <p className="mb-4 text-sm font-medium text-indigo-200">
              PERSONAL PROJECT MANAGEMENT
            </p>
            <h2 className="text-4xl font-bold leading-tight">
              Manage your Projects with Clarity.
            </h2>

            <p className="mt-5 text-sm leading-7 text-indigo-100">
              Organize your Projects, Manage Tasks, Track Progress and keep Everything Together in one Professional Workspace.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 size={19} />
                <span className="text-sm">
                  Organize Multiple Projects
                </span>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle2 size={19} />
                <span className="text-sm">
                  Manage Project Tasks
                </span>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle2 size={19} />
                <span className="text-sm">
                  Track Project Activity
                </span>
              </div>

            </div>
          </div>

          <p className="text-xs text-indigo-200">
            © 2026 ProjectHub. All Rights Reserved.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center justify-center px-5 py-10 sm:px-8">
          <div className="w-full max-w-md">
            {/* MOBILE LOGO */}
            <div className="mb-8 flex justify-center lg:hidden">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
                  <FolderKanban size={22} />
                </div>

                <div>
                  <h1 className="text-lg font-bold text-slate-900">
                    ProjectHub
                  </h1>

                  <p className="text-xs text-slate-400">
                    Personal Workspace
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8">
              {/* TITLE */}
              <div className="mb-7">
                <h2 className="text-2xl font-bold text-slate-900">
                  {mode === "login"
                    ? "Welcome Back"
                    : "Create your Account"}
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  {mode === "login"
                    ? "Sign In to Continue to your Workspace."
                    : "Register to Start Managing your Projects."}
                </p>
              </div>
              {/* TABS */}
              <div className="mb-6 grid grid-cols-2 rounded-xl bg-slate-100 p-1">
                <button type="button" onClick={() => switchMode("login")} className={`rounded-lg py-2.5 text-sm font-semibold transition ${
                mode === "login"
                ? "bg-white text-indigo-600 shadow-sm"
                : "text-slate-500"}`}>
                  Sign In
                </button>

                <button type="button" onClick={() => switchMode("signup")} className={`rounded-lg py-2.5 text-sm font-semibold transition ${
                mode === "signup"
                ? "bg-white text-indigo-600 shadow-sm"
                : "text-slate-500"}`}>
                  Sign Up
                </button>

              </div>

              {/* ERROR */}
              {error && (
                <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              {/* SUCCESS */}
              {success && (
                <div className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-600">
                  {success}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">

                {/* NAME */}
                {mode === "signup" && (
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Full Name
                    </label>

                    <div className="relative">
                      <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>

                      <input type="text" value={name} onChange={(event) => setName(event.target.value)} placeholder="Enter your Name" className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"/>
                    </div>
                  </div>
                )}

                {/* EMAIL */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Email Address
                  </label>

                  <div className="relative">
                    <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>

                    <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter your Email" className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"/>

                  </div>
                </div>

                {/* PASSWORD */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Password
                  </label>

                  <div className="relative">
                    <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>

                    <input type={showPassword
                    ? "text"
                    : "password"
                    } value={password}
                    onChange={(event) =>
                    setPassword(event.target.value)
                    }
                    placeholder="Enter your Password"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-11 text-sm outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"/>

                    <button type="button" onClick={() => setShowPassword((previous) => !previous)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>

                  {mode === "signup" && (
                    <p className="mt-2 text-xs text-slate-400">
                      Password must Contain at least 6 Characters.
                    </p>
                  )}
                </div>

                {/* SUBMIT */}
                <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-100 transition hover:bg-indigo-700">
                  {mode === "login"
                    ? "Sign In"
                    : "Create Account"}
                  <ArrowRight size={17} />
                </button>
              </form>

              {/* SWITCH */}
              <div className="mt-6 text-center text-sm text-slate-500">
                {mode === "login" ? (
                  <>
                    Don't have an Account?{" "}
                    <button type="button" onClick={() => switchMode("signup")}
                    className="font-semibold text-indigo-600 hover:text-indigo-700">
                      Sign Up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an Account?{" "}
                    <button type="button" onClick={() => switchMode("login")}
                    className="font-semibold text-indigo-600 hover:text-indigo-700">
                      Sign In
                    </button>
                  </>
                )}

              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AuthPage;