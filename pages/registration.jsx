import React from 'react';

import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Icon from '@material-ui/core/Icon';
import Radio from '@material-ui/core/Radio';


import Modal from '../components/Modal';
import { Form } from 'react-advanced-form';
import RadioGroupField from '../components/formComponents/RadioGroupField';
import SwitchField from '../components/formComponents/SwitchField';
import TextField from '../components/formComponents/TextField';

import validationMessages from '../validation/validationMessages';
import validationRules from '../validation/validationRules';

import '../styles/main.scss';

export default () => {
    const registerUser = ({ serialized }) => {
        console.log(serialized);
    };

    return (
        <Modal
            fullWidth
            open
            title="Registration"
            titleClass="text-center"
        >
            <Form
                onSubmitStart={registerUser}
                rules={validationRules}
                messages={validationMessages}
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
                <RadioGroupField
                    label="Radio group field"
                    name="gender"
                >
                    <div>
                        <FormControlLabel value="man" id="man" control={<Radio name="gender" color="primary" />} label="Man" />
                        <FormControlLabel value="woman" id="woman" control={<Radio name="gender" color="primary" />} label="Woman" />
                    </div>
                </RadioGroupField>
                <TextField
                    required
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                />
                <TextField
                    required
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
        </Modal>
    );
};
