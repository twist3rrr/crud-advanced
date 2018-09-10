import React from 'react';
import PropTypes from 'prop-types';

import uuid from 'uuid';

import Typography from '@material-ui/core/Typography';

import Card from '../Card';
import Pagination from 'rc-pagination';

function Main(props) {
    const {
        amountOfUsers,
        currentPage,
        fetchCurrentPageUsers,
        isLoggedIn,
        itemsOnPage,
        users,
    } = props;

    const isUsers = users.length;

    const mapUsers = () => {
        return isUsers
            ? users.map(user => <Card {...user} {...{ key: uuid(), isLoggedIn }} />)
            : (
                <Typography
                    variant="title"
                    color="inherit"
                    className="main__heading"
                >
                    There is no users in the list
                </Typography>
            );
    };

    return (
        <div className="main">
            <div className="main__inner">
                { mapUsers() }
            </div>
            <div className="main__pagination pagination__container">
                {
                    !!users.length && <Pagination
                        onChange={current => fetchCurrentPageUsers(current)}
                        current={currentPage}
                        total={amountOfUsers}
                        pageSize={itemsOnPage}
                    />
                }
            </div>
        </div>
    );
}

Main.propTypes = {
    amountOfUsers: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    isLoggedIn: PropTypes.bool,
    itemsOnPage: PropTypes.number.isRequired,
    fetchCurrentPageUsers: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired,
};

Main.defaultProps = {
    isLoggedIn: false,
};

export default Main;
