import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import { Card } from "primereact/card";
import { Button } from "primereact/button";

import useToast from "../hooks/useToast";

import Link from "../components/Link";
import Input from "../components/Input";
import BackgroundImage from "../components/BackgroundImage";

const CREDENTIALS = {
  email: "jenthomasjames@gmail.com",
  password: "Password32",
};

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { showToast, toast } = useToast();

  const defaultValues = {
    identifier: "",
    password: "",
  };

  const {
    control: loginControl,
    reset: resetLogin,
    handleSubmit: handleLoginSubmit,
  } = useForm({ defaultValues });

  const loginHandler = (data) => {
    console.log(data);
    setIsLoading(true);
    if (
      CREDENTIALS.email !== data.identifier ||
      CREDENTIALS.password !== data.password
    ) {
      setIsLoading(false);
      return showToast(
        "Invalid credentials",
        "We could not find any accounts that matched the credetials you provided. Please try again",
        "error"
      );
    }

    resetLogin();
    setIsLoading(false);
    navigate("/dashboard");
  };

  return (
    <>
      <Toast ref={toast} />
      <BackgroundImage>
        <Card
          title={
            <div className="w-full flex flex-col items-center justify-center">
              <div className="flex gap-2 items-center">
                <img src="vite.svg" alt="logo" />
                <h1>Welcome Back!</h1>
              </div>
              <p className="text-sm font-normal">Login to Continue</p>
            </div>
          }
          className="w-1/4"
        >
          <form
            className="flex flex-col gap-3"
            onSubmit={handleLoginSubmit(loginHandler)}
          >
            <Input
              name="identifier"
              control={loginControl}
              placeholder="Email/Phone Number/Username"
            />
            <Input
              name="password"
              type="password"
              control={loginControl}
              placeholder="Password"
            />
            <div className="flex justify-end">
              <Link to="/reset-password">Forgot password?</Link>
            </div>
            <Button size="small" label="Login" loading={isLoading} />
            <div className="flex items-center justify-center gap-2">
              <p className="text-xs">New Here? Let&apos;s</p>
              <Link to="/register">Signup</Link>
            </div>
          </form>
        </Card>
      </BackgroundImage>
    </>
  );
};

export default LoginPage;
