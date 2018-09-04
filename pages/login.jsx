import React, { Component } from 'react';

import JSSProvider from '../components/JSSProvider';
import LoginForm from '../components/forms/LoginForm';
import Snackbar from '../components/Snackbar';
import Spinner from '../components/Spinner';

import '../styles/main.scss';

import { defaultStateHandler } from '../utilities';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            snackbar: {
                autohideDuration: 2000,
                open: false,
                message: 'Message',
                variant: 'success',
            },
            isLoading: false,
        };

        this.defaultStateHandler = defaultStateHandler(this);
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
                            <LoginForm
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

