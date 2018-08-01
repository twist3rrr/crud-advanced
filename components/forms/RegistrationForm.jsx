import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { Form } from 'react-advanced-form';

import TextField from '../formComponents/TextField';
import Snackbar from '../Snackbar';
import Spinner from '../Spinner';
import SwitchField from '../formComponents/SwitchField';

import validationMessages from '../../validation/validationMessages';
import validationRules from '../../validation/validationRules';

export default class extends PureComponent {
    state = {
        isLoading: false,
    }

    submitForm = ({ serialized }) => {
        this.setState({
            isLoading: !this.state.isLoading,
        });

        console.log(serialized);

        this.registerUser(serialized)
            ? this.props.handleSnackbar({
                autohideDuration: 10000,
                open: true,
                message: 'You are successfully registered',
                variant: 'success',
            })
            : this.props.handleSnackbar({
                autohideDuration: 10000,
                open: true,
                message: 'You are not registered',
                variant: 'error',
            });
    }

    registerUser(serialized) {
        fetch('/register', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(serialized)
        })
        .then((res) => {
            console.log('success')
            return (res.status === 200);
        })
        .catch(() => {
            console.log('error')
            return false;
        })
    }

    render() {
        return (
            <div>
                <Form
                    messages={validationMessages}
                    onSubmitStart={this.submitForm}
                    rules={validationRules}
                >
                    <TextField
                        required
                        id="firstName"
                        label="First Name"
                        name="firstName"
                    />
                    <TextField
                        required
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                    />
                    <TextField
                        required
                        id="email"
                        label="Email"
                        name="email"
                        type="email"
                    />
                    <TextField
                        required
                        id="dateOfBirth"
                        label="Date of birth"
                        name="dateOfBirth"
                        type="date"
                    />
                    <SwitchField
                        id="isStudent"
                        label="Is student"
                        name="isStudent"
                        defaultChecked
                    />
                    <TextField
                        required
                        id="password"
                        label="Password"
                        name="password"
                        type="password"
                    />
                    <TextField
                        required
                        id="confirmPassword"
                        label="Confirm password"
                        name="confirmPassword"
                        type="password"
                    />
                    <Button
                        color="primary"
                        fullWidth
                        style={{ marginTop: 20 }}
                        type="submit"
                        variant="contained"
                    >
                        Register
                        <Icon style={{ marginLeft: 10 }}>send</Icon>
                    </Button>
                </Form>
                {this.state.isLoading && <Spinner />}
            </div>
        );
    }
}

