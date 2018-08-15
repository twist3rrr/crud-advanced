import React from 'react';
import PropTypes from 'prop-types';
// Next.js
import Router from 'next/router';
// Material UI
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
// Validation
import { Form } from 'react-advanced-form';
import validationMessages from '../../validation/validationMessages';
import validationRules from '../../validation/validationRules';
// Custom fields
import TextField from '../formComponents/TextField';
// Constants
import { ROUTES } from '../../server/constants';

export default function LoginForm(props) {
    const { defaultStateHandler } = props;

    function loginSuccessHandler() {
        defaultStateHandler({
            isLoading: false,
            snackbar: {
                autohideDuration: 4000,
                open: true,
                message: 'You are successfully logged in',
                variant: 'success',
            },
        }, () => {
            setTimeout(() => {
                Router.push(ROUTES.USERS);
            }, 6000);
        });
    }

    function loginFailureHandler() {
        defaultStateHandler({
            isLoading: false,
            snackbar: {
                autohideDuration: 4000,
                open: true,
                message: 'You are not logged in',
                variant: 'error',
            },
        });
    }

    function loginUser(serialized) {
        fetch(ROUTES.LOGIN, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(serialized),
        })
            .then((res) => {
                (res.status === 200)
                    ? loginSuccessHandler()
                    : loginFailureHandler();
            })
            .catch(() => {
                loginFailureHandler();
            });
    }

    function submitForm({ serialized }) {
        defaultStateHandler({ isLoading: true });

        loginUser(serialized);
    }

    return (
        <div>
            <Typography variant="headline" component="h2">
                Login
            </Typography>
            <Form
                messages={validationMessages}
                onSubmitStart={submitForm}
                rules={validationRules}
            >
                <TextField
                    required
                    id="email"
                    label="Email"
                    name="email"
                    type="email"
                />
                <TextField
                    required
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                />
                <Button
                    color="primary"
                    fullWidth
                    style={{ marginTop: 20 }}
                    type="submit"
                    variant="contained"
                >
                    Login
                    <Icon style={{ marginLeft: 10 }}>send</Icon>
                </Button>
            </Form>
        </div>
    );
}

LoginForm.propTypes = {
    defaultStateHandler: PropTypes.func.isRequired,
};

