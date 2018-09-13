import React from 'react';
import PropTypes from 'prop-types';
// Next.js
import Router, { withRouter } from 'next/router';
// Material UI
import Button from '@material-ui/core/Button';
// import FormControl from '@material-ui/core/FormControl';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
// Validation
import { Form } from 'react-advanced-form';
import validationMessages from '../../validation/validationMessages';
import validationRules from '../../validation/validationRules';
// Custom fields
import RadioField from '../formComponents/Radio/RadioField';
import SwitchField from '../formComponents/SwitchField';
import TextField from '../formComponents/TextField';
// Constants
import { ROUTES } from '../../server/constants';
// Utilities
import { capitalizeFirstLetter, deleteAuthCookies } from './../../utilities';

function RegistrationForm(props) {
    const { defaultStateHandler } = props;
    const initialValues = props.router.query;

    function successHandler(message) {
        defaultStateHandler({
            isLoading: false,
            snackbar: {
                autohideDuration: 2000,
                open: true,
                message,
                variant: 'success',
            },
        }, () => {
            setTimeout(() => {
                Router.push(ROUTES.USERS);
            }, 3000);
        });
    }

    function failureHandler(message) {
        defaultStateHandler({
            isLoading: false,
            snackbar: {
                autohideDuration: 2000,
                open: true,
                message,
                variant: 'error',
            },
        });
    }

    function updateUser(serialized) {
        fetch(ROUTES.UPDATE_USER, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(serialized),
        })
            .then((res) => {
                (res.status === 200)
                    ? successHandler('User info is succesfully updated')
                    : failureHandler('Some error occured while updating user info');
            })
            .catch(() => {
                failureHandler('Some error occured while updating user info');
            });
    }

    function deleteUserSuccessHandler() {
        successHandler('User is succesfully deleted');
        deleteAuthCookies();
    }

    function deleteUser() {
        fetch(ROUTES.DELETE_USER, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({ email: initialValues.email }),
        })
            .then((res) => {
                (res.status === 200)
                    ? deleteUserSuccessHandler()
                    : failureHandler('Some error occured while deleting user');
            })
            .catch(() => {
                failureHandler('Some error occured while deleting user');
            });
    }

    function submitForm({ serialized }) {
        defaultStateHandler({ isLoading: true });

        updateUser(serialized);
    }

    function onDeleteClick() {
        defaultStateHandler({ isLoading: true });

        deleteUser();
    }

    return (
        <div>
            <Typography variant="headline" component="h2">
                Correction
            </Typography>
            <Form
                messages={validationMessages}
                onSubmitStart={submitForm}
                rules={validationRules}
            >
                <TextField
                    required
                    id="firstName"
                    initialValue={capitalizeFirstLetter(initialValues.firstName)}
                    label="First Name"
                    name="firstName"
                />
                <TextField
                    required
                    id="lastName"
                    initialValue={capitalizeFirstLetter(initialValues.lastName)}
                    label="Last Name"
                    name="lastName"
                />
                <TextField
                    disabled
                    required
                    id="email"
                    initialValue={initialValues.email}
                    label="Email"
                    name="email"
                    type="email"
                />
                <TextField
                    required
                    id="dateOfBirth"
                    initialValue={initialValues.dateOfBirth}
                    label="Date of birth"
                    name="dateOfBirth"
                    type="date"
                />
                <SwitchField
                    id="isStudent"
                    label="Is student"
                    name="isStudent"
                    checked={(initialValues.isStudent === 'true')}
                />
                <RadioField
                    id="man"
                    {...(initialValues.gender === 'man') && { defaultChecked: true }}
                    value="man"
                    name="gender"
                    label="Man"
                />
                <RadioField
                    id="woman"
                    {...(initialValues.gender === 'woman') && { defaultChecked: true }}
                    value="woman"
                    name="gender"
                    label="Woman"
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
                    Change data
                    <Icon style={{ marginLeft: 10 }}>send</Icon>
                </Button>
                <Button
                    color="secondary"
                    fullWidth
                    style={{ marginTop: 20 }}
                    type="button"
                    variant="contained"
                    onClick={onDeleteClick}
                >
                    Remove account
                    <Icon style={{ marginLeft: 10 }}>delete</Icon>
                </Button>
            </Form>
        </div>
    );
}

RegistrationForm.propTypes = {
    router: PropTypes.object.isRequired,
    defaultStateHandler: PropTypes.func.isRequired,
};

export default withRouter(RegistrationForm);

