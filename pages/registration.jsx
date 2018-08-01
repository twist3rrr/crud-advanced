import React, { Component } from 'react';

import Modal from '../components/Modal';
import RegistrationForm from '../components/forms/RegistrationForm';
import Snackbar from '../components/Snackbar';

import '../styles/main.scss';

export default class extends Component {
    state = {
        snackbar: {
            autohideDuration: 5000,
            open: false,
            message: 'Message',
            variant: 'success',
        }
    };

    onClose = () => {
        this.setState((prevState) => {
            return {
                snackbar: {
                    ...prevState.snackbar,
                    open: false,
                }
            }
        })
    };

    handleSnackbar = (newSnackbar) => {
        this.setState({
            snackbar: newSnackbar
        });
    }

    render() {
        return (
            <>
                <RegistrationForm
                    handleSnackbar={this.handleSnackbar}
                />
                <Snackbar 
                    {...
                        this.state.snackbar
                    }
                    onClose={this.onClose}
                />
            </>
        );
    }
};
