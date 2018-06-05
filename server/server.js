const expressJS = require('express');
const nextJS = require('next');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
/* Helpers */
const { unless } = require('./helpers');
/* Constants */
const { PORT, PAGES_WITHOUT_LOGIN } = require('./constants');

const app = nextJS();
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = expressJS();

    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(cookieParser());

    server.use(unless(PAGES_WITHOUT_LOGIN, (req, res, next) => {
        const token = req.cookies['x-access-token'];
        if (token) {
            next();
        } else {
            res.redirect('/login');
        }
    }));

    server.get('*', (req, res) => { handle(req, res); });

    console.log(unless);

    server.listen(PORT, (err) => {
        if (err) throw err;
        console.log(`Server is ready on port: ${PORT}`);
    });
});
