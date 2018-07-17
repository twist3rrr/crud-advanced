import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Switch from '@material-ui/core/Switch';

import { createField, fieldPresets } from 'react-advanced-form';

class SwitchField extends Component {
    render() {
        const {
            disabled,
            fieldProps,
            fieldState,
            label,
        } = this.props;

        const { required, invalid, errors } = fieldState;

        return (
            <div>
                <FormControl
                    {...{ disabled }}
                    {...{ error: !!invalid }}
                    {...{ required }}
                >
                    <FormControlLabel
                        control={
                            <Switch
                                {...{ checked: fieldProps.checked }}
                                {...{ inputProps: { ...fieldProps } }}
                            />
                        }
                        {...label && { label }}
                    />
                    { !!invalid && errors.map(error => (
                        <FormHelperText>{ error }</FormHelperText>
                    ))}
                </FormControl>
            </div>
        );
    }
}

SwitchField.propTypes = {
    disabled: PropTypes.bool,
    fieldProps: PropTypes.object.isRequired,
    fieldState: PropTypes.object.isRequired,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
};

SwitchField.defaultProps = {
    disabled: false,
    label: '',
};

export default createField(fieldPresets.checkbox)(SwitchField);
