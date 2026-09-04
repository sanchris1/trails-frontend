import { api } from "@/lib/api";

export async function loginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data } = await api.post("/auth/login", {
    password,
    email,
  });
  console.log("Data:", data);
  return data;
}
