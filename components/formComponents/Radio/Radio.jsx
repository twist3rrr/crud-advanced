import React, { Component } from 'react';
import PropTypes from 'prop-types';

import uuid from 'uuid';
import { createField, fieldPresets } from 'react-advanced-form';

import Radio from '@material-ui/core/Radio';

/* Alone radio comnponent */

class RadioInput extends Component {
    render() {
        const {
            color,
            fieldProps,
            value,
            id,
        } = this.props;

        return (
            <Radio
                {...{ id }}
                {...{ value }}
                {...{ color }}
                {...fieldProps}
            />
        );
    }
}

RadioInput.propTypes = {
    color: PropTypes.string.isRequired,
    fieldProps: PropTypes.object.isRequired,
    fieldState: PropTypes.object.isRequired,
    id: PropTypes.string,
    value: PropTypes.string.isRequired,
};

RadioInput.defaultProps = {
    id: uuid(),
};

export default createField(fieldPresets.radio)(RadioInput);
