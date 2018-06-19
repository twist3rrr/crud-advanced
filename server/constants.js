/** @see ServerConstants */

const AUTH_TOKEN_DATA = 'shhhhhhhhwerewhrhhhwerhhwr';
const AUTH_TOKEN_KEY = 'shhhhh';
const AUTH_TOKEN_NAME = 'x-access-token';
const DB_LINK = 'mongodb://crud-advanced-user:1q2w3e4r5t@ds147450.mlab.com:47450/crud-advanced';
const DB_NAME = 'crud-advanced';
const PAGES_WITHOUT_LOGIN = ['_next', '/login', 'auth'];
const PORT = 3000;
const ROUTES = {
    DELETE_USER: '/deleteuser',
    GET_USERS: '/getusers',
    LOGIN: '/auth/login',
    LOGIN_PAGE: '/login',
    REGISTRATION: '/registration',
    SIMULATE_LOGIN: '/auth/simulateauth',
    UPDATE_USER: '/updateuser',
};

module.exports = {
    AUTH_TOKEN_DATA,
    AUTH_TOKEN_NAME,
    AUTH_TOKEN_KEY,
    DB_LINK,
    DB_NAME,
    PAGES_WITHOUT_LOGIN,
    PORT,
    ROUTES,
};

