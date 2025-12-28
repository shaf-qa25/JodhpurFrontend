import { Outlet } from "react-router-dom";
import Header from "../components/Headeradmin";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-[1600px] mx-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}