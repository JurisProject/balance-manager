import axios from 'axios';
import { parseAccountUniqueTokens } from './parsers';

const openseaApiKey = process.env.REACT_APP_OPENSEA_API_KEY || '';

/**
 * Configuration for opensea api
 * @type axios instance
 */
const api = axios.create({
  baseURL: 'https://api.opensea.io/api/v1',
  timeout: 30000, // 30 secs
  headers: {
    Accept: 'application/json',
    'X-API-KEY': openseaApiKey,
  },
});

/**
 * @desc get opensea unique tokens
 * @param  {String}   [address='']
 * @return {Promise}
 */
export const apiGetAccountUniqueTokens = async (address = '') => {
  const data = await api.get(`/assets?owner=${address}`);
  var result = parseAccountUniqueTokens(data);
  result.push({
    imageUrl:
      'https://ucarecdn.com/5068174e-0fac-41f9-8a61-b0cf288b2843/Wave12018Card.jpg',
    name: 'Juris Wave 1',
    id: '1',
    background: '#fff',
    contractAddress: '0x0',
  });
  return result;
};
