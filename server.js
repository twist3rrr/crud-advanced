const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const app = next();
const handle = app.getRequestHandler();

const PORT = 3000;

app.prepare().then(() => {
    const server = express();

    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(cookieParser());

    server.use(unless(['_next', '/login'], (req, res, next) => {
        const token = req.cookies['x-access-token'];
        if (token) {
            next();
        } else {
            res.redirect('/login');
        }
    }));

    server.get('*', (req, res) => {
        return handle(req, res);
    });

    server.listen(PORT, (err) => {
        if(err) throw err;
        console.log('Server is ready on port ' + PORT);
    });
});

const unless  = (paths, middleware) => {
    return function(req, res, next) {
        let isHave = false;
        paths.forEach((path) => {
            console.log(req.path);
            if (req.path !== '/' && path === req.path || req.path.includes(path)) {
                isHave = true;
                return;
            }
        })

        if (isHave) {
            return next()
        } else {
            return middleware(req, res, next)
        }
    }
}
