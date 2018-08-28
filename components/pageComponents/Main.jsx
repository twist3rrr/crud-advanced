import React from 'react';

import uuid from 'uuid';

import Typography from '@material-ui/core/Typography';
import Card from '../Card';

export default (props) => {
    const { lastName, users } = props;
    const formattedValue = lastName.toLowerCase().trim();
    const isUsers = users.length;
    const filteredUsers = isUsers && users.filter(user => (user.lastName.toLowerCase().includes(formattedValue)));

    return (
        <div className="main">
            {isUsers
                ? filteredUsers.map(user => <Card {...user} {...{ key: uuid() }} />)
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
};
