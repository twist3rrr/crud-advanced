import React, { Component } from 'react';
import PropTypes from 'prop-types';

import uuid from 'uuid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

class TextField extends Component {
    render() {
        const {
            disabled,
            errors,
            fullWidth,
            id,
            invalid,
            label,
            onChange,
            required,
            value,
        } = this.props;

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
                        {...{ disabled }}
                        {...{ required }}
                        {...{ value }}
                        {...onChange && { onChange: e => onChange(e.target.value) }}

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
    errors: PropTypes.array,
    fullWidth: PropTypes.bool,
    id: PropTypes.string,
    invalid: PropTypes.bool,
    required: PropTypes.bool,
    label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
    ]),
    onChange: PropTypes.func,
    value: PropTypes.string,
};

TextField.defaultProps = {
    disabled: false,
    errors: [],
    fullWidth: true,
    id: uuid(),
    invalid: false,
    required: false,
    label: null,
    onChange: () => true,
    value: '',
};

export default TextField;
