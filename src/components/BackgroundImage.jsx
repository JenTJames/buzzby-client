import PropTypes from "prop-types";

const BackgroundImage = ({ children }) => {
  return (
    <div className="w-full min-h-screen opacity-80 flex justify-center items-center">
      {children}
    </div>
  );
};

BackgroundImage.propTypes = {
  children: PropTypes.element.isRequired,
};

export default BackgroundImage;
