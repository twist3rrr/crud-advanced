const {
    AUTH_TOKEN_KEY,
    AUTH_TOKEN_NAME,
} = require('./constants');

const { currentUserIsLoggedIn, findMatchShape } = require('./helpers');
const jwt = require('jsonwebtoken');

const getUsersRoute = async (req, res, database) => {
    const usersCollection = database.collection('users');
    const { page, items, name } = req.query;

    const trimmedName = name.trim();
    const splitedName = trimmedName.split(' ');
    const firstName = splitedName[0] && splitedName[0].toLowerCase();
    const lastName = splitedName[1] && splitedName[1].toLowerCase();

    const lookupShape = {
        ...!!firstName && { firstName: new RegExp(firstName) },
        ...!!lastName && { lastName: new RegExp(lastName) },
    };

    const total = await usersCollection.find(lookupShape).count();

    const skip = (page - 1) * items;

    usersCollection.find(lookupShape)
        .skip(Number(skip))
        .limit(Number(items))
        .project({ _id: 0 })
        .toArray((err, docs) => {
            if (err) return res.sendStatus(500);

            return res.send(JSON.stringify({ users: docs, total }));
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

const updateUserRoute = (req, res, database) => {
    const { email } = req.body;
    const usersCollection = database.collection('users');
    const token = req.cookies[AUTH_TOKEN_NAME];

    const authData = { email, token, key: AUTH_TOKEN_KEY };

    currentUserIsLoggedIn(authData, res, () => {
        usersCollection.findOneAndUpdate({ email }, { $set: { ...req.body } }, (err, result) => {
            if (err || result.value === null) return res.sendStatus(400);
            return res.sendStatus(200);
        });
    });
};

const loginRoute = (req, res, database) => {
    const { email, password } = req.body;
    const usersCollection = database.collection('users');

    usersCollection.find({ email, password }).toArray((err, docs) => {
        if (err || !docs.length) return res.sendStatus(401);

        const token = jwt.sign({ data: email }, AUTH_TOKEN_KEY);

        return res
            .cookie(AUTH_TOKEN_NAME, token, { maxAge: 31536000000, httpOnly: false })
            .sendStatus(200);
    });
};

const registrationRoute = (req, res, database) => {
    delete req.body.confirmPassword;
    const {
        email,
        dateOfBirth,
        firstName,
        gender,
        isStudent,
        password,
        lastName,
    } = req.body;
    const usersCollection = database.collection('users');

    findMatchShape(usersCollection, { email }, (users) => {
        if (!users.length && email && password) {
            return usersCollection.insertOne({
                email,
                dateOfBirth,
                gender,
                isStudent,
                firstName: firstName.toLowerCase(),
                password,
                lastName: lastName.toLowerCase(),
            }, (err) => {
                if (err) return res.sendStatus(500);

                return res.sendStatus(200);
            });
        }

        return res.sendStatus(400);
    });
};

module.exports = {
    deleteUserRoute,
    getUsersRoute,
    loginRoute,
    registrationRoute,
    updateUserRoute,
};
