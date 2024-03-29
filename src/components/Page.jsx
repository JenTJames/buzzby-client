import PropTypes from "prop-types";

const Page = ({ children }) => {
  return <div className="bg-slate-500">{children}</div>;
};

Page.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Page;
