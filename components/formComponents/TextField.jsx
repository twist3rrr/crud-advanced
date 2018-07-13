import React from 'react';
import PropTypes from 'prop-types';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

function TextField(props) {
    const {
        onChange,
        disabled,
        error,
        fullWidth,
        id,
        label,
        type,
        value,
    } = props;

    return (
        <div>
            <FormControl
                {...disabled && { disabled }}
                {...error && { error: !!error }}
                {...{ fullWidth }}
            >
                { label && <InputLabel htmlFor={id}>{ label }</InputLabel> }
                <Input
                    id={id}
                    {...value && { value }}
                    {...type && { type }}
                    {...onChange && onChange}
                />
                { error && <FormHelperText id={`${id}-text`}>{ error }</FormHelperText> }
            </FormControl>
        </div>
    );
}

TextField.propTypes = {
    disabled: PropTypes.bool,
    error: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
    ]),
    fullWidth: PropTypes.bool,
    id: PropTypes.string.isRequired,
    label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
    ]),
    onChange: PropTypes.func,
    type: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
    ]),
    value: PropTypes.string.isRequired,
};

TextField.defaultProps = {
    disabled: false,
    error: null,
    fullWidth: true,
    label: null,
    onChange: () => true,
    type: null,
};

export default TextField;
