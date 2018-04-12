import axios from 'axios';
import { parseAccountBalances } from './helpers';

const apiGetAccountBalances = async (address = '', network = 'mainnet') => {
  try {
    const { data } = await axios.get(
      `https://${
        network === 'mainnet' ? `api` : network
      }.trustwalletapp.com/tokens?address=${address}`
    );
    console.log(data);
    const balances = await parseAccountBalances(data, address, network);
    return balances || {};
  } catch (error) {
    throw error;
  }
};

export const handler = async (event, context, callback) => {
  console.log('EVENT', event, '\n');
  const address = event.path.replace('/balance/', '');

  try {
    const data = await apiGetAccountBalances(address);
    console.log(data);
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(data.ETH.balance)
    });
  } catch (error) {
    console.error(error);
    callback(null, {
      statusCode: 500,
      body: error
    });
  }
};
