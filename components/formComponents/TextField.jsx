import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { createField, fieldPresets } from 'react-advanced-form';
import uuid from 'uuid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

class TextField extends Component {
    render() {
        const {
            disabled,
            fieldProps,
            fieldState,
            fullWidth,
            id,
            label,
        } = this.props;

        const { required, invalid, errors } = fieldState;

        return (
            <div>
                <FormControl
                    {...disabled && { disabled }}
                    {...{ error: !!invalid }}
                    {...{ fullWidth }}
                    {...{ required: !!required }}
                >
                    { label && <InputLabel htmlFor={id}>{ label }</InputLabel> }
                    <Input
                        id={id}
                        {...fieldProps}
                    />
                    { !!invalid && errors.map(error => (
                        <FormHelperText key={uuid()}>{ error }</FormHelperText>
                    ))}
                </FormControl>
            </div>
        );
    }
}

TextField.propTypes = {
    disabled: PropTypes.bool,
    fieldProps: PropTypes.object.isRequired,
    fieldState: PropTypes.object.isRequired,
    fullWidth: PropTypes.bool,
    id: PropTypes.string.isRequired,
    label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
    ]),
};

TextField.defaultProps = {
    disabled: false,
    fullWidth: true,
    label: null,
};

export default createField(fieldPresets.input)(TextField);
