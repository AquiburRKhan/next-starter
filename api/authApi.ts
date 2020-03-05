import { post, get } from '../helpers/apiHelper';

export const login = async (data: object, params: object) => await post('/login/email', data, params);

export const me = async () => await get('/users/me');