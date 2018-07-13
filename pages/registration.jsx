import React from 'react';

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Icon from '@material-ui/core/Icon';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Switch from '@material-ui/core/Switch';

import Modal from '../components/Modal';
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
                    error=""
                    label="First Name"
                />
                <TextField
                    id="lastName"
                    error=""
                    label="Last Name"
                />
                <TextField
                    id="dateOfBirth"
                    error=""
                    label="Date of birth"
                    type="date"
                />
                <div>
                    <FormControlLabel
                        control={
                            <Switch
                                checked
                                value="checkedA"
                            />
                        }
                        label="Student"
                    />
                </div>
                <div>
                    <FormControl component="fieldset" required className="">
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup
                            aria-label="gender"
                            name="gender2"
                            className=""
                            value="male"
                            onChange={this.handleChange}
                        >
                            <FormControlLabel value="male" control={<Radio color="primary" />} label="Male" />
                            <FormControlLabel value="female" control={<Radio color="primary" />} label="Female" />
                        </RadioGroup>
                        <FormHelperText>You can display an error</FormHelperText>
                    </FormControl>
                </div>
                <TextField
                    id="password"
                    error=""
                    label="Password"
                    type="password"
                    value=""
                />
                <TextField
                    id="confirmPassword"
                    error=""
                    label="Confirm password"
                    type="password"
                    value=""
                />
                <Button variant="contained" fullWidth color="primary" className="" style={{ marginTop: 20 }}>
                    Register
                    <Icon className="" style={{ marginLeft: 10 }}>send</Icon>
                </Button>
            </div>
        </Modal>
    );
};
