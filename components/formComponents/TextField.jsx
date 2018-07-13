import React from 'react';
import PropTypes from 'prop-types';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

function TextField(props) {
    const {
        onChange,
        error,
        id,
        label,
        type,
        value,
    } = props;

    return (
        <div>
            <FormControl error={!!error} fullWidth>
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
    error: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
    ]),
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
    value: PropTypes.string,
};

TextField.defaultProps = {
    error: null,
    label: null,
    onChange: () => true,
    type: null,
    value: '',
};

export default TextField;
