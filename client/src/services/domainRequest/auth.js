import { post } from "../requestHelper";

export const login = async (body) => {
  const data = await post("auth/login", body);

  return data;
};
