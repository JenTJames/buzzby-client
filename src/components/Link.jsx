import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const Link = ({ children, to }) => {
  const navigate = useNavigate();

  return (
    <p
      className="text-cyan-500 text-xs cursor-pointer hover:text-cyan-600 hover:underline"
      onClick={() => navigate(to)}
    >
      {children}
    </p>
  );
};

Link.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
};

export default Link;
