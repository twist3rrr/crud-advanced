import React, { Component } from 'react';

import JSSProvider from '../components/JSSProvider';
import RegistrationForm from '../components/forms/RegistrationForm';
import Snackbar from '../components/Snackbar';
import Spinner from '../components/Spinner';

import '../styles/main.scss';

export default class extends Component {
    state = {
        snackbar: {
            autohideDuration: 2000,
            open: false,
            message: 'Message',
            variant: 'success',
        },
        isLoading: false,
    };

    defaultStateHandler = (newState, callback) => {
        this.setState({
            ...newState,
        }, callback);
    }

    closeSnackbar = () => {
        this.setState((prevState) => {
            return {
                snackbar: {
                    ...prevState.snackbar,
                    open: false,
                },
            };
        });
    }

    render() {
        return (
            <JSSProvider>
                <div>
                    <div className="backdrop">
                        <div className="backdrop__item">
                            <RegistrationForm
                                handleSnackbar={this.handleSnackbar}
                                defaultStateHandler={this.defaultStateHandler}
                            />
                        </div>
                    </div>
                    <Snackbar
                        {...this.state.snackbar}
                        onClose={this.closeSnackbar}
                    />
                    { this.state.isLoading && <Spinner /> }
                </div>
            </JSSProvider>
        );
    }
}
