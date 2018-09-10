import React from 'react';
import PropTypes from 'prop-types';
// Next.js
import Router from 'next/router';
// Material UI
import Avatar from '@material-ui/core/Avatar';
import { default as MaterialUICard } from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
// Utilities
import url from 'url';
import moment from 'moment';
import { capitalizeFirstLetter } from '../utilities';
// Constants
import { ROUTES, DOMEN } from '../server/constants';

function Card(props) {
    const {
        dateOfBirth,
        email,
        firstName,
        gender,
        isStudent,
        isLoggedIn,
        lastName,
    } = props;

    const onCardClick = () => {
        const targetUrl = url.format({
            pathname: ROUTES.CORRECTION,
            host: DOMEN,
            query: {
                dateOfBirth,
                email,
                firstName,
                gender,
                isStudent,
                lastName,
            },
        });

        Router.push(targetUrl);
    };

    return (
        <div className="main__item">
            <MaterialUICard
                style={{ cursor: isLoggedIn && 'pointer' }}
                onClick={isLoggedIn && onCardClick}
            >
                <CardHeader
                    avatar={
                        <Avatar aria-label="Recipe">
                            {`${firstName[0].toUpperCase()}.${lastName[0].toUpperCase()}`}
                        </Avatar>
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
    email: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    gender: PropTypes.string,
    isLoggedIn: PropTypes.bool,
    isStudent: PropTypes.bool.isRequired,
    lastName: PropTypes.string.isRequired,
};

Card.defaultProps = {
    gender: '',
    isLoggedIn: false,
};

export default Card;
