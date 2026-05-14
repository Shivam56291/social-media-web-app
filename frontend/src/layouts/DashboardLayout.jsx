import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import useOnboardingGuard from "../hooks/useOnboardingGuard";

export default function DashboardLayout() {
  useOnboardingGuard();

  return (
    <div className="min-h-screen bg-[#070B14] text-white">
      <div className="flex">
        {/* SIDEBAR */}
        <div className="fixed left-0 top-0 h-screen w-[260px] border-r border-white/10 bg-white/[0.03] backdrop-blur-xl z-50">
          <Sidebar />
        </div>

        {/* CONTENT */}
        <main className="ml-[260px] flex-1 min-h-screen px-4 py-5 sm:px-6 lg:px-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}