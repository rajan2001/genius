import NavBar from "@/components/navbar";
import SideBar from "@/components/sidebar";

const DashBoardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full relative">
      <div className="hidden md:flex md:flex-col md:h-full md:w-72 z-[80] fixed bg-gray-900">
        <div className="text-white">
            <SideBar/>
        </div>
      </div>
      <main className="md:pl-72">
        <NavBar/>
        {children}
      </main>
    </div>
  );
};

export default DashBoardLayout;
