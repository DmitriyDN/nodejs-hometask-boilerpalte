import { get, post, deleteReq } from "../requestHelper";

const entity = "fights";

export const getFights = async () => {
  return await get(entity);
};

export const createFight = async (body) => {
  console.log(body);
  return await post(entity, body);
};

export const deleteFight = async (id) => {
  return await deleteReq(entity, id);
};
