const jwt = require('jsonwebtoken');

function currentUserIsLoggedIn(authData, res, next) {
    const { email, token, key } = authData;

    jwt.verify(token, key, (err, decoded) => {
        if (err) return res.sendStatus(400);
        console.log('verifying in process');

        if (decoded.data === email.trim(' ')) {
            console.log('verified');
            next();
        } else {
            return res.sendStatus(400);
        }
    });
}

function unless(paths, middleware) {
    return (req, res, next) => {
        let isHave = false;

        paths.forEach((path) => {
            if (req.path === '/' || path === req.path || req.path.includes(path)) {
                isHave = true;
            }
        });

        if (isHave) {
            return next();
        }

        return middleware(req, res, next);
    };
}

function findMatchShape(collection, shape, next) {
    collection.find({ ...shape }).toArray((err, users) => {
        if (err) throw err;
        next(users);
    });
}

module.exports = {
    currentUserIsLoggedIn,
    findMatchShape,
    unless,
};
