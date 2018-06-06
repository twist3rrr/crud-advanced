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

module.exports = {
    unless,
};
