// eslint-disable-next-line no-unused-vars
import axios from '../config/axios';

// eslint-disable-next-line import/prefer-default-export
export const queryRec = () => axios.get('/queryBlockDB/find?limit=200&type=4&sort=height%20DESC');

// eslint-disable-next-line no-useless-concat
export const search = data => axios.get('/queryBlockDB/find?limit=200&type=4&sort=height%20DESC' + `&primaryKey=${data}`);
