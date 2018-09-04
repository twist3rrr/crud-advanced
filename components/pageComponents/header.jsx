import React from 'react';
import PropTypes from 'prop-types';

import Link from 'next/link';
import Cookies from 'js-cookie';
import uuid from 'uuid';

import { ROUTES } from '../../server/constants';

import Avatar from '@material-ui/core/Avatar';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import FolderIcon from '@material-ui/icons/Folder';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import green from '@material-ui/core/colors/green';

const styles = {
    appBar: {
        borderRadius: '5px',
    },
    button: {
        margin: '5px',
    },
    buttonGroup: {
        marginLeft: 'auto',
    },
    logo: {
        margin: 10,
        color: '#fff',
        backgroundColor: green[500],
    },
    toolbar: {
        paddingLeft: '5px',
        paddingRight: '5px',
    },
};

function Header(props) {
    const { isLoggedIn } = props;

    const handleLogout = () => {
        Cookies.remove('x-access-token');
        window.location.reload();
    };

    const renderLoginButton = () => {
        return (
            <Link
                prefetch
                key={uuid()}
                href={ROUTES.LOGIN_PAGE}
            >
                <Button
                    style={styles.button}
                    variant="contained"
                    color="primary"
                >
                    Login
                </Button>
            </Link>
        );
    };

    const renderLogoutButton = () => {
        return (
            <Button
                style={styles.button}
                variant="contained"
                color="secondary"
                onClick={handleLogout}
            >
            Logout
            </Button>
        );
    };

    const renderRegisterButton = () => {
        return (
            <Link
                prefetch
                key={uuid()}
                href={ROUTES.REGISTRATION_PAGE}
            >
                <Button
                    style={styles.button}
                    variant="contained"
                >
                    Register
                </Button>
            </Link>
        );
    };

    return (
        <div>
            <AppBar style={styles.appBar} position="static" color="default">
                <Toolbar style={styles.toolbar}>
                    <Avatar style={styles.logo}>
                        <FolderIcon />
                    </Avatar>
                    <Typography variant="title">
                        CRUD ADVANCED
                    </Typography>
                    <div style={styles.buttonGroup}>
                        {
                            isLoggedIn
                                ? renderLogoutButton()
                                : [renderRegisterButton(), renderLoginButton()]
                        }
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

Header.propTypes = {
    isLoggedIn: PropTypes.bool,
};

Header.defaultProps = {
    isLoggedIn: false,
};

export default Header;
