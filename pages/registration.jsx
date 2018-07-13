import React from 'react';

import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Icon from '@material-ui/core/Icon';
import Radio from '@material-ui/core/Radio';
import RadioGroupField from '../components/formComponents/RadioGroupField';


import Modal from '../components/Modal';
import SwitchField from '../components/formComponents/SwitchField';
import TextField from '../components/formComponents/TextField';

import '../styles/main.scss';

export default () => {
    return (
        <Modal
            fullWidth
            open
            title="Registration"
            titleClass="text-center"
        >
            <div>
                <TextField
                    id="firstName"
                    label="First Name"
                />
                <TextField
                    id="lastName"
                    label="Last Name"
                />
                <TextField
                    id="email"
                    label="Email"
                    type="email"
                />
                <TextField
                    id="dateOfBirth"
                    label="Date of birth"
                    type="date"
                />
                <SwitchField
                    label="student"
                />
                <RadioGroupField
                    label="Radio group field"
                    value="other"
                >
                    <FormControlLabel value="man" control={<Radio color="primary" />} label="Man" />
                    <FormControlLabel value="woman" control={<Radio color="primary" />} label="Woman" />
                </RadioGroupField>
                <TextField
                    id="password"
                    label="Password"
                    type="password"
                    value=""
                />
                <TextField
                    id="confirmPassword"
                    label="Confirm password"
                    type="password"
                    value=""
                />
                <Button
                    color="primary"
                    fullWidth
                    style={{ marginTop: 20 }}
                    variant="contained"
                >
                    Register
                    <Icon className="" style={{ marginLeft: 10 }}>send</Icon>
                </Button>
            </div>
        </Modal>
    );
};
