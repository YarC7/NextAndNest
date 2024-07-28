"use client"

import LoginForm from "./form-login";

export default function Login() {
  return (
    <div className="flex min-h-screen flex-col p-24">
      <h1 className="text-xl font-semibold text-center">Đăng nhập</h1>
      <div className="flex justify-center">
        <LoginForm/>
      </div>
    </div>
  );
}
