import { cookies } from "next/headers";
import { getErrorMessage } from "./errors";
import envConfig from "@/config";
import { LoginBodyType } from "@/schemaValidations/auth.schema";
const getHeaders = () => ({
  Cookie: cookies().toString(),
});

const API_URL = envConfig.NEXT_PUBLIC_API_ENDPOINT
export const post = async (path: string, values: LoginBodyType) => {
  const res = await fetch(`${API_URL}/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...getHeaders() },
    body: JSON.stringify(values),
  });
  const parsedRes = await res.json();
  if (!res.ok) {
    return { error: getErrorMessage(parsedRes) };
  }
  return parsedRes;
};

export const get = async (path: string) => {
  const res = await fetch(`${API_URL}/${path}`, {
    headers: { ...getHeaders() },
  });
  return res.json();
};