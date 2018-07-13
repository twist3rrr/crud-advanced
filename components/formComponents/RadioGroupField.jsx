import React from 'react';
import PropTypes from 'prop-types';

import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';

function RadioGroupField(props) {
    const {
        disabled,
        error,
        label,
        onChange,
        required,
        value,
    } = props;

    return (
        <div>
            <FormControl
                {...disabled && { disabled }}
                {...required && { required }}
            >
                { !!label && <FormLabel>{label}</FormLabel> }
                <RadioGroup
                    {...value && { value }}
                    {...{ onChange }}
                >
                    { props.children }
                </RadioGroup>
                { !!error && <FormHelperText>{error}</FormHelperText>}
            </FormControl>
        </div>
    );
}

RadioGroupField.propTypes = {
    children: PropTypes.element.isRequired,
    disabled: PropTypes.bool,
    error: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.string,
    ]),
    label: PropTypes.string,
    onChange: PropTypes.func,
    required: PropTypes.bool,
    value: PropTypes.string,
};

RadioGroupField.defaultProps = {
    disabled: false,
    error: null,
    label: '',
    onChange: () => true,
    required: false,
    value: '',
};

export default RadioGroupField;
