import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { createField, fieldPresets } from 'react-advanced-form';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';

class RadioGroupField extends Component {
    render() {
        const {
            disabled,
            fieldProps,
            fieldState,
            label,
        } = this.props;

        const { errors, invalid, required } = fieldState;

        return (
            <div>
                <FormControl
                    {...disabled && { disabled }}
                    {...{ error: !!invalid }}
                    {...required && { required }}
                >
                    { !!label && <FormLabel>{label}</FormLabel> }
                    <RadioGroup
                        {...{ fieldProps }}
                    >
                        { this.props.children }
                    </RadioGroup>
                    { !!invalid && errors.map(error => (
                        <FormHelperText>{ error }</FormHelperText>
                    ))}
                </FormControl>
            </div>
        );
    }
}

RadioGroupField.propTypes = {
    children: PropTypes.element.isRequired,
    fieldProps: PropTypes.object.isRequired,
    fieldState: PropTypes.object.isRequired,
    disabled: PropTypes.bool,
    label: PropTypes.string,
};

RadioGroupField.defaultProps = {
    disabled: false,
    label: '',
};

export default createField(fieldPresets.radio)(RadioGroupField);
