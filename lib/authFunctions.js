function getEnsureAuth() {
    return function ensureAuth(req, res, next) {
        console.log('WADDDDDUPPPPPPPPP');
        const token = req.get('Authorization');
        if (token === 'thestreetzarereal') next();
        else next({code: 401, error: 'Fool you aint real !!!'});
    };
}


module.exports = getEnsureAuth;