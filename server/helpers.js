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
    findMatchShape,
    unless,
};
