
import { UserButton } from "@clerk/nextjs";
import MobileSideBar from "./mobile-sidebar";


const NavBar = () => {
  return (
    <div className="p-4 flex items-center">
      <MobileSideBar/>
      <div className="flex w-full justify-end">
      <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default NavBar;
