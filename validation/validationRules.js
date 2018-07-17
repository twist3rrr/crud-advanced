export default {
    type: {
        email: ({ value }) => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value),
        password: ({ value }) => (value.length > 7),
    },
    name: {
        firstName: ({ value }) => /^[a-z A-Z]+$/.test(value),
        lastName: ({ value }) => /^[a-z A-Z]+$/.test(value),
        confirmPassword: ({ value, fields }) => (value === fields.password.value),
    },
};
