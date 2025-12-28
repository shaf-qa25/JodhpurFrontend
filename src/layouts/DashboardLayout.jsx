// import { Outlet } from "react-router-dom";
// import Header from "../components/Headeradmin";

// export default function DashboardLayout() {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header />
//       <main className="max-w-[1600px] mx-auto p-6">
//         <Outlet />
//       </main>
//     </div>
//   );
// }



import { Outlet } from "react-router-dom";
import Header from "../components/Headeradmin";

export default function DashboardLayout() {
  return (
    /* '!bg-white' taaki peeche wala koi bhi neela color hat jaye */
    <div className="min-h-screen  !bg-white"> 
      <Header />
      {/* Humne max-width, mx-auto aur padding-6 sab hata diya hai */}
      <main className="w-full"> 
        <Outlet />
      </main>
    </div>
  );
}