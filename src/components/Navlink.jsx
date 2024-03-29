import PropTypes from "prop-types";
import { NavLink as RouterNavLink } from "react-router-dom";

const Navlink = ({ navItem }) => {
  return (
    <RouterNavLink
      to={navItem.route}
      className={({ isActive }) =>
        isActive
          ? "flex gap-3 items-center p-3 cursor-pointer bg-cyan-400 text-slate-700"
          : "flex gap-3 items-center p-3 cursor-pointer hover:bg-cyan-100 text-slate-500"
      }
    >
      <i className={`pi ${navItem.icon}`}></i>
      <p>{navItem.label}</p>
    </RouterNavLink>
  );
};

Navlink.propTypes = {
  navItem: PropTypes.object.isRequired,
};

export default Navlink;
