import React from 'react';
import PropTypes from 'prop-types';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { default as MaterialUICard } from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

function Card(props) {
    const { isLoggedIn } = props;

    return (
        <div className="main__item">
            <MaterialUICard>
                <CardHeader
                    avatar={
                        <Avatar aria-label="Recipe">
                            R
                        </Avatar>
                    }
                    action={
                        isLoggedIn &&
                        <Button
                            variant="contained"
                            color="secondary"
                            style={{
                                marginTop: '12px',
                            }}
                        >
                        Delete
                        </Button>
                    }
                    title="Tom Hardy"
                    subheader="September 14, 2016"
                />
            </MaterialUICard>
        </div>
    );
}

Card.propTypes = {
    isLoggedIn: PropTypes.bool,
};

Card.defaultProps = {
    isLoggedIn: false,
};

export default Card;
