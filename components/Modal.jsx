import React from 'react';
import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

function Modal(props) {
    const {
        children,
        contentClass,
        fullWidth,
        handleClose,
        open,
        title,
        titleClass,
    } = props;

    function Transition(props) {
        return <Slide direction="up" {...props} />;
    }

    return (
        <div>
            <Dialog
                {...{ fullWidth }}
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose && handleClose}
            >
                <DialogTitle id="alert-dialog-slide-title" className={titleClass}>
                    { title }
                </DialogTitle>
                <DialogContent className={contentClass}>
                    { children }
                </DialogContent>
            </Dialog>
        </div>
    );
}

Modal.propTypes = {
    contentClass: PropTypes.string,
    children: PropTypes.element.isRequired,
    fullWidth: PropTypes.bool,
    handleClose: PropTypes.func,
    open: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    titleClass: PropTypes.string,
};

Modal.defaultProps = {
    contentClass: '',
    fullWidth: false,
    handleClose: () => true,
    titleClass: '',
};

export default Modal;
