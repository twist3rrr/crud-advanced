import React from 'react';

import Modal from '../components/Modal';
import RegistrationForm from '../components/RegistrationForm';

import '../styles/main.scss';

export default () => {
    return (
        <Modal
            fullWidth
            open
            title="Registration"
            titleClass="text-center"
        >
            <RegistrationForm />
        </Modal>
    );
};
