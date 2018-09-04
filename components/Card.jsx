import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import { capitalizeFirstLetter } from '../utilities';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { default as MaterialUICard } from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

function Card(props) {
    const {
        dateOfBirth,
        firstName,
        isLoggedIn,
        lastName,
    } = props;

    return (
        <div className="main__item">
            <MaterialUICard>
                <CardHeader
                    avatar={
                        <Avatar aria-label="Recipe">
                            {`${firstName[0]}.${lastName[0]}`}
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
                    title={`${capitalizeFirstLetter(firstName)} ${capitalizeFirstLetter(lastName)}`}
                    subheader={moment(dateOfBirth).format('MMMM Do YYYY')}
                />
            </MaterialUICard>
        </div>
    );
}

Card.propTypes = {
    dateOfBirth: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool,
    lastName: PropTypes.string.isRequired,
};

Card.defaultProps = {
    isLoggedIn: false,
};

export default Card;
