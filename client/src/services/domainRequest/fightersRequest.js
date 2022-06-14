import { get, post } from "../requestHelper";

const entity = "fighters";

export const getFighters = async () => {
  return await get(entity);
};
export const getFighter = async (id) => {
  return await get(entity, id);
};

export const createFighter = async (body) => {
  return await post(entity, body);
};
