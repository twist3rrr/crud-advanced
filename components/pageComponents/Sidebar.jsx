import React from 'react';
import PropTypes from 'prop-types';
// Next.js
import Router from 'next/router';
// Material UI
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
// Custom fields
import InputField from '../InputField';
// Constants
import { ROUTES } from '../../server/constants';

const styles = {
    card: {
        padding: '15px',
    },
};

function Sidebar(props) {
    const {
        handleInputChange,
        isLoggedIn,
        userName,
    } = props;

    function newUserClickHandler() {
        Router.push(ROUTES.REGISTRATION_PAGE);
    }

    return (
        <Card style={styles.card}>
            <InputField
                label="Filter users"
                value={userName}
                onChange={value => handleInputChange(value)}
            />
            {
                isLoggedIn &&
                <Button
                    color="primary"
                    fullWidth
                    style={{ marginTop: 20 }}
                    variant="contained"
                    onClick={newUserClickHandler}
                >
                    Ceate new user
                    <AddIcon style={{ marginLeft: '10px' }} />
                </Button>
            }
        </Card>
    );
}

Sidebar.propTypes = {
    handleInputChange: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    userName: PropTypes.string.isRequired,
};

export default Sidebar;
