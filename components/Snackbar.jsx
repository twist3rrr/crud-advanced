import React from 'react';
import PropTypes from 'prop-types';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { withStyles } from '@material-ui/core/styles';

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

const SnackbarContentStyles = theme => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.dark,
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing.unit,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
});

function MySnackbarContent(props) {
    const {
        classes,
        className,
        message,
        onClose,
        variant,
        ...other
    } = props;

    const Icon = variantIcon[variant];

    return (
        <SnackbarContent
            className={`${classes[variant]} ${className}`}
            message={
                <span id="client-snackbar" className={classes.message}>
                    <Icon className={`${classes.icon} ${classes.iconVariant}`} />
                    {message}
                </span>
            }
            action={[
                <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    className={classes.close}
                    onClick={onClose}
                >
                    <CloseIcon className={classes.icon} />
                </IconButton>,
            ]}
            {...other}
        />
    );
}

MySnackbarContent.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    message: PropTypes.node,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

MySnackbarContent.defaultProps = {
    className: '',
    message: null,
    onClose: () => true,
};

const MySnackbarContentWrapper = withStyles(SnackbarContentStyles)(MySnackbarContent);

const SnackbarPopupStyles = theme => ({
    margin: {
        margin: theme.spacing.unit,
    },
});

function SnackbarPopup(props) {
    const {
        autoHideDuration,
        horizontal,
        message,
        onClose,
        open,
        variant,
        vertical,
    } = props;

    return (
        <Snackbar
            {...{
                anchorOrigin: {
                    vertical,
                    horizontal,
                },
                open,
                autoHideDuration,
                onClose,
            }}
        >
            <MySnackbarContentWrapper
                {...{
                    onClose,
                    variant,
                    message,
                }}
            />
        </Snackbar>
    );
}

SnackbarPopup.propTypes = {
    autoHideDuration: PropTypes.number,
    horizontal: PropTypes.string,
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool,
    variant: PropTypes.string.isRequired,
    vertical: PropTypes.string,
};

SnackbarPopup.defaultProps = {
    autoHideDuration: 3000,
    horizontal: 'left',
    open: false,
    vertical: 'bottom',
};

export default withStyles(SnackbarPopupStyles)(SnackbarPopup);
