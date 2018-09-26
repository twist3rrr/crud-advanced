import url from 'url';
import Cookies from 'js-cookie';

import { DOMEN, ROUTES, AUTH_TOKEN_NAME, AUTH_EMAIL_NAME } from '../server/constants';

export const defaultStateHandler = _this => (newState, callback) => {
    _this.setState({
        ...newState,
    }, callback);
};

export const deleteAuthCookies = () => {
    Cookies.remove(AUTH_TOKEN_NAME);
    Cookies.remove(AUTH_EMAIL_NAME);
};

export const buildGetUsersUrl = (page, items, name) => {
    return url.format({
        pathname: ROUTES.GET_USERS,
        protocol: 'https:',
        host: DOMEN,
        query: {
            page,
            items,
            name,
        },
    });
};

export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};
