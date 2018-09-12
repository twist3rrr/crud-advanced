/** @see ServerConstants */

const AUTH_TOKEN_KEY = 'shhhhh';
const AUTH_TOKEN_NAME = 'x-access-token';
const AUTH_EMAIL_NAME = 'x-access-email';
const DB_LINK = 'mongodb://crud-advanced-user:1q2w3e4r5t@ds147450.mlab.com:47450/crud-advanced';
const DB_NAME = 'crud-advanced';
const PAGES_WITHOUT_LOGIN = ['_next', '/login', '/registration', '/getusers', 'auth'];
const PORT = 3000;
const DOMEN = `localhost:${PORT}`;
const ROUTES = {
    CORRECTION: '/correction',
    DELETE_USER: '/deleteuser',
    GET_USERS: '/getusers',
    USERS: '/',
    LOGIN: '/auth/login',
    LOGIN_PAGE: '/login',
    REGISTRATION_PAGE: '/registration',
    REGISTRATION: '/auth/register',
    SIMULATE_LOGIN: '/auth/simulateauth',
    UPDATE_USER: '/updateuser',
};

module.exports = {
    AUTH_EMAIL_NAME,
    AUTH_TOKEN_NAME,
    AUTH_TOKEN_KEY,
    DB_LINK,
    DB_NAME,
    DOMEN,
    PAGES_WITHOUT_LOGIN,
    PORT,
    ROUTES,
};

