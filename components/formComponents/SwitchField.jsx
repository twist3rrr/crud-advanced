import React from 'react';

import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Switch from '@material-ui/core/Switch';

import PropTypes from 'prop-types';

function SwitchField(props) {
    const {
        checked,
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
                {...error && { error: !!error }}
                {...required && { required }}
            >
                <FormControlLabel
                    control={
                        <Switch
                            {...{ checked }}
                            {...{ onChange }}
                            {...{ value }}
                        />
                    }
                    {...label && { label }}
                />
                {!!error && <FormHelperText>{ error }</FormHelperText>}
            </FormControl>
        </div>
    );
}

SwitchField.propTypes = {
    checked: PropTypes.bool.isRequired,
    disabled: PropTypes.bool,
    error: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string,
    ]),
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    required: PropTypes.bool,
    value: PropTypes.bool.isRequired,
};

SwitchField.defaultProps = {
    disabled: false,
    error: null,
    label: '',
    required: false,
};

export default SwitchField;
