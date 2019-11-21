import jwtDecode from "jwt-decode";
import felicidadeApi from "../api/felicidadeApi";
import { getToken } from "../utils/token";

export async function getLoggedUser() {
  const token = await getToken();

  const { data } = await felicidadeApi.get("/users/me", {
    headers: {
      "x-auth-token": token
    }
  });

  return data;
}

export async function getUserId() {
  const token = await getToken();
  const user = jwtDecode(token);
  return user._id;
}
