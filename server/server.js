const expressJS = require('express');
const jwt = require('jsonwebtoken');
const { MongoClient } = require('mongodb');
const nextJS = require('next');

/* Helpers */
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { unless } = require('./helpers');

/* Constants */
const {
    AUTH_TOKEN_KEY,
    AUTH_TOKEN_NAME,
    DB_LINK,
    DB_NAME,
    PAGES_WITHOUT_LOGIN,
    PORT,
    ROUTES,
} = require('./constants');

/* Routes */
const {
    deleteUserRoute,
    getUsersRoute,
    loginRoute,
    registrationRoute,
    updateUserRoute,
} = require('./routes');

/* References */
const app = nextJS();
let database;
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = expressJS();

    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(cookieParser());

    server.use(unless(PAGES_WITHOUT_LOGIN, (req, res, next) => {
        const token = req.cookies[AUTH_TOKEN_NAME];

        if (token) {
            const email = jwt.verify(token, AUTH_TOKEN_KEY).data;

            const usersCollection = database.collection('users');

            usersCollection.find({ email }).project({ _id: 0 }).toArray((err, docs) => {
                if (err || !docs.length) return res.redirect(ROUTES.LOGIN_PAGE);

                return next();
            });
        } else {
            res.redirect(ROUTES.LOGIN_PAGE);
        }
    }));

    server.post(ROUTES.LOGIN, (req, res) => loginRoute(req, res, database));

    server.post(ROUTES.REGISTRATION, (req, res) => registrationRoute(req, res, database));

    server.get(ROUTES.GET_USERS, (req, res) => getUsersRoute(req, res, database));

    server.post(ROUTES.DELETE_USER, (req, res) => deleteUserRoute(req, res, database));

    server.post(ROUTES.UPDATE_USER, (req, res) => updateUserRoute(req, res, database));

    server.get('*', (req, res) => { handle(req, res); });

    MongoClient.connect(
        DB_LINK,
        (err, client) => {
            if (err) throw err;

            database = client.db(DB_NAME);
            console.log('DB is connected');

            server.listen(PORT, (err) => {
                if (err) throw err;
                console.log(`Server is ready on port: ${PORT}`);
            });
        },
    );
});

