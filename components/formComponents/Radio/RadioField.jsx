import React from 'react';
import PropTypes from 'prop-types';

import FormControlLabel from '@material-ui/core/FormControlLabel';

import Radio from './Radio';

/* Complete Field with label */

function ReadioField(props) {
    const {
        color,
        defaultChecked,
        disabled,
        label,
        value,
        id,
        name,
    } = props;

    return (
        <FormControlLabel
            {...{ disabled }}
            {...{ label }}
            control={
                <Radio
                    {...{
                        ...defaultChecked && { checked: defaultChecked },
                        name,
                        color,
                        value,
                        id,
                    }}
                />
            }
        />
    );
}

ReadioField.propTypes = {
    color: PropTypes.string.isRequired,
    defaultChecked: PropTypes.bool,
    disabled: PropTypes.bool,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    id: PropTypes.string,
};

ReadioField.defaultProps = {
    defaultChecked: false,
    disabled: false,
    id: '',
    label: '',
};

export default ReadioField;
