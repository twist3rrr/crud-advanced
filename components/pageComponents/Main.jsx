import React from 'react';
import PropTypes from 'prop-types';

import uuid from 'uuid';

import Typography from '@material-ui/core/Typography';
import Card from '../Card';

function Main(props) {
    const { userName, users } = props;
    const isUsers = users.length;

    const filterUsers = () => {
        const splittedUserName = userName.split(' ');

        if (splittedUserName.length >= 1) {
            const formattedFirstName = splittedUserName[0].toLowerCase();
            const formattedLastName = splittedUserName[1] && splittedUserName[1].toLowerCase();

            return users.filter((user) => {
                return (splittedUserName.length === 1)
                    ? (
                        user.firstName.toLowerCase().includes(formattedFirstName) ||
                        user.lastName.toLowerCase().includes(formattedFirstName)
                    )
                    : (
                        (user.firstName.toLowerCase().includes(formattedFirstName) &&
                        user.lastName.toLowerCase().includes(formattedLastName)) ||
                        (user.firstName.toLowerCase().includes(formattedLastName) &&
                        user.lastName.toLowerCase().includes(formattedFirstName))
                    );
            });
        }

        return users;
    };

    return (
        <div className="main">
            {isUsers
                ? filterUsers().map(user => <Card {...user} {...{ key: uuid() }} />)
                : (
                    <Typography
                        variant="title"
                        color="inherit"
                        className="main__heading"
                    >
                        There is no users in the list
                    </Typography>
                )
            }
        </div>
    );
}

Main.propTypes = {
    userName: PropTypes.string.isRequired,
    users: PropTypes.array.isRequired,
};

export default Main;
