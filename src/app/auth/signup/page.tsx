"use client";

import InputComponent from "@/components/common/InputComponent";
import Logo from "@/components/common/Logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Marker, MarkerContent } from "@/components/ui/marker";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { signupWithGoogle } from "@/hooks/signupWithGoogle";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

type FormValues = {
  name: string;
  email: string;
  password: string;
};

type FieldConfig = {
  name: keyof FormValues;
  label: string;
  type?: string;
  placeholder?: string;
  options?: { label: string; value: string }[];
};

const Signup = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const [values, setValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);

  const fields: FieldConfig[] = [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Your name...",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "you@example.com",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "********",
    },
  ];

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleSubmit = async () => {
    await authClient.signUp.email(
      {
        email: values.email,
        name: values.name,
        password: values.password,
      },
      {
        onRequest: () => {
          setLoading(true);
        },

        onSuccess: () => {
          setLoading(false);
          toast.success("user created successfully");
        },
        onError: (ctx) => {
          setLoading(false);

          toast.error(ctx.error.message || "Error signing in user try again");
        },
      },
    );
  };

  return (
    <div className="w-screen flex h-screen">
      <div className="hidden lg:flex lg:w-1/2  justify-center items-center space-y-3 flex-col relative">
        <div className="flex flex-col items-start gap-3 ">
          {" "}
          <h2 className="text-4xl text-accent font-semibold leading-relaxed">
            Trails and Memoirs
          </h2>
          <p className="text-sm font-medium text-secondary max-w-sm">
            The mountains are calling and I must go. <br /> <br /> Join us for
            the upcoming adventures into the natural world
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center w-full lg:w-1/2 ">
        <Card className="w-full max-w-md">
          <CardHeader>
            <Logo />
            <h4 className="text-xl font-semibold text-accent">
              Welcome to Trails
            </h4>
            <span className="text-xs text-foreground font-light">
              Please signup to continue
            </span>
          </CardHeader>
          <CardContent className="space-y-4">
            {fields.map((field) => (
              <InputComponent
                key={field.name}
                name={field.name}
                label={field.label}
                type={field.type}
                value={values[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
              />
            ))}

            <Button className="w-full" onClick={handleSubmit}>
              {loading ? <Spinner /> : "Submit"}
            </Button>
            <Marker variant="separator">
              <MarkerContent>Or continue with Google</MarkerContent>
            </Marker>
            <Button
              className="w-full"
              variant={"outline"}
              onClick={() => signupWithGoogle()}
            >
              Continue with Google
            </Button>
          </CardContent>
          <Separator />
          <CardFooter className="text-center">
            <p className="text-center">
              Already have an account ?{" "}
              <Link
                href={"/auth/login"}
                className="hover:font-semibold hover:underline text-primary"
              >
                Login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
