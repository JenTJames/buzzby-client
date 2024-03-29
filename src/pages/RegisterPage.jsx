import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

import Link from "../components/Link";
import Input from "../components/Input";
import BackgroundImage from "../components/BackgroundImage";

const RegisterPage = () => {
  const [showDialog, setShowDialog] = useState(false);
  const navigate = useNavigate();

  const defaultValues = {
    firstname: "",
    lastname: "",
    password: "",
    email: "",
  };
  const form = useForm({ defaultValues });

  const onRegister = (data) => {
    form.reset();
    console.log(data);
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
    navigate("/login");
  };

  return (
    <>
      <Dialog
        className="w-1/3"
        header="Successfully created the account"
        visible={showDialog}
        footer={
          <Button
            className="float-end"
            onClick={closeDialog}
            label="Continue to login"
            icon="pi pi-arrow-right"
            iconPos="right"
            size="small"
          />
        }
        onHide={closeDialog}
      >
        <p className="m-0">
          Your account was created successfully. You can login with your
          credentials.
        </p>
      </Dialog>
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
            onSubmit={form.handleSubmit(onRegister)}
            className="flex flex-col gap-3"
          >
            <div className="flex items-center gap-1">
              <Input
                name="firstname"
                control={form.control}
                errors={form.formState.errors}
                placeholder="Firstname"
                rules={{
                  required: "Firstname is required",
                }}
              />
              <Input
                name="lastname"
                control={form.control}
                errors={form.formState.errors}
                placeholder="Lastname"
                rules={{
                  required: "Lastname is required",
                }}
              />
            </div>
            <Input
              name="email"
              control={form.control}
              errors={form.formState.errors}
              placeholder="Email"
              rules={{
                required: "Email is required",
              }}
            />
            <Input
              name="password"
              type="password"
              control={form.control}
              errors={form.formState.errors}
              placeholder="Password"
              feedback={true}
              rules={{
                required: "Password is required",
              }}
            />
            <Button size="small" label="Register" />
            <div className="flex items-center justify-center gap-2">
              <p className="text-xs">Already have an account? Let&apos;s</p>
              <Link to="/login">Login</Link>
            </div>
          </form>
        </Card>
      </BackgroundImage>
    </>
  );
};

export default RegisterPage;
