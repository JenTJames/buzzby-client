import { Chip } from "primereact/chip";
import { Divider } from "primereact/divider";
import { Avatar } from "primereact/avatar";

import Brand from "./Brand";
import Navlink from "./Navlink";

const NAVLINKS = [
  {
    id: 1,
    label: "Dashboard",
    route: "/dashboard",
    icon: "pi-home",
  },
  {
    id: 2,
    label: "My Tasks",
    route: "/my-tasks",
    icon: "pi-box",
  },
  {
    id: 3,
    label: "Teams",
    route: "/teams",
    icon: "pi-users",
  },
  {
    id: 4,
    label: "Logout",
    route: "/login",
    icon: "pi-power-off",
  },
];

const Sidebar = () => {
  return (
    <div className="h-screen sticky top-0 w-72 flex flex-col border-r">
      <div className="flex-0">
        <div className="flex justify-between items-center p-5">
          <Brand />
          <Chip className="text-xs" label="v0.0.1" />
        </div>
        <Divider className="m-0" />
      </div>
      <div className="flex-1 overflow-y-auto">
        {NAVLINKS.map((navLink) => (
          <Navlink key={navLink.id} navItem={navLink} />
        ))}
      </div>
      <div className="flex-0">
        <Divider className="m-0" />
        <div className="flex gap-3 items-center p-5">
          <Avatar
            image="https://images.unsplash.com/photo-1572708609421-8eae59509dec?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fGd1eXxlbnwwfHwwfHx8MA%3D%3D"
            shape="circle"
            imageAlt="user image"
            size="large"
          />
          <div className="flex flex-col">
            <h1>Jen Thomas James</h1>
            <p className="text-xs text-slate-500">jenthomasjames2gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
