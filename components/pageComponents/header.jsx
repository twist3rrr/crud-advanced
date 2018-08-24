import React from 'react';
import PropTypes from 'prop-types';

import Link from 'next/link';
import uuid from 'uuid';

import { ROUTES } from '../../server/constants';

import Avatar from '@material-ui/core/Avatar';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import FolderIcon from '@material-ui/icons/Folder';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import green from '@material-ui/core/colors/green';

const styles = theme => ({
    appBar: {
        borderRadius: '5px',
    },
    button: {
        margin: theme.spacing.unit,
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
});

function Header(props) {
    const {
        classes,
        isLoggedIn,
    } = props;

    const renderLoginButton = () => {
        return (
            <Link
                prefetch
                key={uuid()}
                href={ROUTES.LOGIN_PAGE}
            >
                <Button
                    className={classes.button}
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
                className={classes.button}
                variant="contained"
                color="secondary"
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
                    className={classes.button}
                    variant="contained"
                >
                    Register
                </Button>
            </Link>
        );
    };

    return (
        <div>
            <AppBar className={classes.appBar} position="static" color="default">
                <Toolbar className={classes.toolbar}>
                    <Avatar className={classes.logo}>
                        <FolderIcon />
                    </Avatar>
                    <Typography variant="title">
                        CRUD ADVANCED
                    </Typography>
                    <div className={classes.buttonGroup}>
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
    classes: PropTypes.object.isRequired,
    isLoggedIn: PropTypes.bool,
};

Header.defaultProps = {
    isLoggedIn: false,
};

export default withStyles(styles)(Header);
