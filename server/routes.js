const {
    AUTH_TOKEN_DATA,
    AUTH_TOKEN_KEY,
    AUTH_TOKEN_NAME,
} = require('./constants');

const { findMatchShape } = require('./helpers');
const jwt = require('jsonwebtoken');

const getUsersRoute = (req, res, database) => {
    const usersCollection = database.collection('users');

    usersCollection.find({}, { _id: 0 }).toArray((err, docs) => {
        if (err || !docs.length) return res.sendStatus(401);

        return res.send(JSON.stringify(docs));
    });
};

const deleteUserRoute = (req, res, database) => {
    const { email } = req.body;
    const usersCollection = database.collection('users');

    usersCollection.findOneAndDelete({ email }, (err, result) => {
        if (err) return res.sendStatus(400);

        if (result.value === null) return res.sendStatus(500);

        return res.sendStatus(200);
    });
};

const loginRoute = (req, res, database) => {
    const { email, password } = req.body;
    const usersCollection = database.collection('users');

    usersCollection.find({ email, password }).toArray((err, docs) => {
        if (err || !docs.length) return res.sendStatus(401);

        const token = jwt.sign({ data: AUTH_TOKEN_DATA }, AUTH_TOKEN_KEY);

        return res
            .cookie(AUTH_TOKEN_NAME, token, { maxAge: 31536000000, httpOnly: true })
            .sendStatus(200);
    });
};

const registrationRoute = (req, res, database) => {
    const { email, password } = req.body;
    const usersCollection = database.collection('users');

    findMatchShape(usersCollection, { email }, (users) => {
        if (!users.length && email && password) {
            return usersCollection.insertOne({ email, password }, (err) => {
                if (err) return res.sendStatus(500);
                return res.sendStatus(200);
            });
        }

        return res.sendStatus(400);
    });
};

const simulateAuthRoute = (req, res) => {
    const token = jwt.sign({ data: AUTH_TOKEN_DATA }, AUTH_TOKEN_KEY);
    return res
        .cookie(AUTH_TOKEN_NAME, token, { maxAge: 31536000000, httpOnly: true })
        .send('You are autorized');
};

module.exports = {
    deleteUserRoute,
    getUsersRoute,
    loginRoute,
    registrationRoute,
    simulateAuthRoute,
};
