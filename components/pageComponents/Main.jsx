import React from 'react';

import uuid from 'uuid';

import Card from '../Card';

export default (props) => {
    const { users } = props;
    return (
        <div className="main">
            {users.length
                ? users.map(user => <Card {...user} {...{ key: uuid() }} />)
                : <h2 className="text-center">There is no users in the list</h2>
            }
        </div>
    );
};
