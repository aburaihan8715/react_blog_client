import { Outlet } from "react-router-dom";
import Topbar from "../components/topbar/Topbar";

const AppLayout = () => {
  return (
    <div>
      <Topbar />
      <Outlet />
    </div>
  );
};

export default AppLayout;
