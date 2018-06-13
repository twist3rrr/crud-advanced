const {
    AUTH_TOKEN_DATA,
    AUTH_TOKEN_KEY,
    AUTH_TOKEN_NAME,
} = require('./constants');
const jwt = require('jsonwebtoken');

const loginRoute = (req, res, database) => {
    const usersCollection = database.collection('users');
    const { email, password } = req.body;

    usersCollection.find({ email, password }).toArray((err, docs) => {
        if (err || !docs.length) return res.sendStatus(401);

        const token = jwt.sign({ data: AUTH_TOKEN_DATA }, AUTH_TOKEN_KEY);

        return res
            .cookie(AUTH_TOKEN_NAME, token, { maxAge: 31536000000, httpOnly: true })
            .sendStatus(200);
    });
};

const simulateAuthRoute = (req, res) => {
    const token = jwt.sign({ data: AUTH_TOKEN_DATA }, AUTH_TOKEN_KEY);
    res
        .cookie(AUTH_TOKEN_NAME, token, { maxAge: 31536000000, httpOnly: true })
        .send('You are autorized');
};

module.exports = {
    loginRoute,
    simulateAuthRoute,
};
