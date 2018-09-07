import React, { Component } from 'react';

import JSSProvider from '../components/JSSProvider';
import CorrectionForm from '../components/forms/CorrectionForm';
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
                            <CorrectionForm
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
