import PropTypes from "prop-types";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { Controller } from "react-hook-form";
import { Password } from "primereact/password";

const Input = ({
  name,
  control,
  rules,
  errors,
  placeholder,
  type = "text",
  feedback = false,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <>
          <label
            htmlFor={field.name}
            className={classNames({ "p-error": errors?.value })}
          ></label>
          <div className="flex flex-col">
            <span className="p-float-label">
              {type.toLowerCase() !== "password" ? (
                <InputText
                  id={field.name}
                  value={field.value}
                  type={type}
                  className={classNames({
                    "p-invalid": fieldState.error,
                    "w-full": true,
                  })}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              ) : (
                <Password
                  inputClassName="w-full"
                  id={field.name}
                  value={field.value}
                  toggleMask
                  feedback={feedback}
                  className={classNames({
                    "p-invalid": fieldState.error,
                    "w-full": true,
                  })}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
              <label htmlFor={field.name}>{placeholder}</label>
            </span>
            <small className="p-error">
              {errors && errors[name] && errors[name].message}
            </small>
          </div>
        </>
      )}
    />
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  rules: PropTypes.object,
  errors: PropTypes.object,
  errorMessage: PropTypes.string,
  type: PropTypes.string,
  feedback: PropTypes.bool,
};

export default Input;
