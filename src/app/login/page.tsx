"use client";

import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import LogInModule from "./_component/LogInModule";

export default function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoginError(false);
    try {
      const response = await signIn("credentials", {
        username: id,
        password,
        redirect: false,
      });
      if (response?.error) {
        setLoginError(true);
      } else {
        window.location.href = "/";
      }
    } catch (err) {
      console.error(err);
      setLoginError(true);
    }
  };

  const onChangeId: ChangeEventHandler<HTMLInputElement> = (e) => {
    setId(e.target.value);
  };

  const onChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value);
  };

  return (
    <LogInModule
      id={id}
      password={password}
      loginError={loginError}
      onChangeId={onChangeId}
      onChangePassword={onChangePassword}
      onSubmit={onSubmit}
    />
  );
}
