import axios from 'axios';

// UTILITY //
export const getUserData = () => JSON.parse(localStorage.getItem('user'));
export const setUserData = data => localStorage.setItem('user', JSON.stringify(data));

export const isLoggedIn = () => {
  const token = localStorage.getItem('token');
  const userData = getUserData();

  if (token && userData) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    return true;
  }

  return false;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// API //
export const postLogin = ({ email, password }) => {
  return axios.post('/api/auth/login', { email, password })
    .then((res) => {
      localStorage.setItem('token', res.data.token);
      setUserData(res.data.user);
      axios.defaults.headers.Authorization = `Bearer ${res.data.token}`;
    });
};

export const getTickers = () => {
  return axios.get('/api/tickers')
    .then(res => res.data);
};

export const getBalances = () => {
  return axios.get('/api/balances')
    .then((res) => {
      const balances = res.data[0];
      const cleanRes = Object.keys(balances)
        .map(key => ({ label: key, balance: balances[key] }));

      return cleanRes;
    });
};

export const getTransactions = () => {
  return axios.get('/api/transactions')
    .then(res => res.data);
};

export const postTransactions = ({ symbol, side, price, amount }) => {
  return axios.post('/api/transactions', {
    symbol,
    side,
    price,
    amount
  }).then(res => res.data);
};
