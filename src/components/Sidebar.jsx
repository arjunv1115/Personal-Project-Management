import { LayoutDashboard, FolderKanban, CheckSquare, Activity, Settings, X, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Sidebar({
  activeSection,
  setActiveSection,
  mobileOpen,
  setMobileOpen,
}) {
  const { user, logout } = useAuth();
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "projects",
      label: "Projects",
      icon: FolderKanban,
    },
    {
      id: "tasks",
      label: "Tasks",
      icon: CheckSquare,
    },
    {
      id: "activity",
      label: "Activity",
      icon: Activity,
    },
  ];

  const getInitials = () => {
    if (!user?.name) {
      return "U";
    }

    return user.name.split(" ").map((word) => word[0]).join("").slice(0, 2).toUpperCase();
  };

  const handleLogout = () => {
    const confirmed = window.confirm(
      "Are you sure you want to Logout?"
    );

    if (confirmed) {
      logout();
    }
  };

  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setMobileOpen(false)}/>
      )}

      <aside className={`fixed left-0 top-0 z-40 h-screen w-64 border-r border-slate-200 bg-white transition-transform duration-300 lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        {/* HEADER */}
        <div className="flex h-20 items-center justify-between border-b border-slate-100 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
              <FolderKanban size={21} />
            </div>

            <div>
              <h1 className="text-sm font-bold text-slate-900">
                ProjectHub
              </h1>
              <p className="text-xs text-slate-400">
                Personal Workspace
              </p>
            </div>

          </div>

          <button className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden" onClick={() => setMobileOpen(false)}>
            <X size={19} />
          </button>

        </div>

        {/* NAVIGATION */}
        <div className="px-4 py-6">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Workspace
          </p>
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = activeSection === item.id;
              return (
                <button key={item.id}
                onClick={() => {
                    setActiveSection(item.id);
                    setMobileOpen(false);
                }}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${active ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}>
                  <Icon size={19} />
                  {item.label}
                </button>
              );
            })}

          </nav>

          <p className="mb-3 mt-8 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            System
          </p>

          <button onClick={() => {
              setActiveSection("settings");
              setMobileOpen(false);
            }}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${activeSection === "settings"
              ? "bg-indigo-50 text-indigo-700"
              : "text-slate-600 hover:bg-slate-50"}`}>
            <Settings size={19} />
            Settings
          </button>

        </div>

        {/* USER + LOGOUT */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-slate-100 bg-white p-4">
          <div className="mb-3 flex items-center gap-3 rounded-xl bg-slate-50 p-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
              {getInitials()}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-800">
                {user?.name || "User"}
              </p>
              <p className="truncate text-xs text-slate-400">
                {user?.email || ""}
              </p>
            </div>
          </div>

          <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50 hover:text-red-600">
            <LogOut size={19} />
            Logout
          </button>

        </div>
      </aside>
    </>
  );
}

export default Sidebar;