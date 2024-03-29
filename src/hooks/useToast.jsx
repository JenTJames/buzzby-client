import { useRef } from "react";

const useToast = () => {
  const toast = useRef(null);

  const showToast = (
    summary = "Something went wrong",
    detail = "No additional information is available.",
    severity = "error"
  ) => {
    toast.current.show({
      severity,
      summary,
      detail,
    });
  };

  return { showToast, toast };
};

export default useToast;
