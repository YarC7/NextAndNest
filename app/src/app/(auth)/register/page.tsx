"use client";

import RegisterForm from "./form-register";

export default function Register() {
  return (
    <div className="flex min-h-screen flex-col p-24">
      <h1 className="text-xl font-semibold text-center">Đăng ký</h1>
      <div className="flex justify-center">
        <RegisterForm />
      </div>
    </div>
  );
}
