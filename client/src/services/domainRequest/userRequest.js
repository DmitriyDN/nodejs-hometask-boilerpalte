import { post } from "../requestHelper";
const entity = 'user'

export const createUser = async (body) => {
    return await post(entity, body);
}