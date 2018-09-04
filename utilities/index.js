import url from 'url';
import { DOMEN, ROUTES } from '../server/constants';

export const defaultStateHandler = _this => (newState, callback) => {
    _this.setState({
        ...newState,
    }, callback);
};

export const buildGetUsersUrl = (page, items, name) => {
    return url.format({
        pathname: ROUTES.GET_USERS,
        protocol: 'http:',
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
