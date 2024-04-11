import PropTypes from "prop-types";

import Sidebar from "./Sidebar";

const Authorized = ({ children }) => {
  return (
    <div className="w-full min-h-screen flex">
      <Sidebar />
      <div className="flex flex-col gap-3 p-10 flex-1">{children}</div>
    </div>
  );
};

Authorized.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Authorized;
