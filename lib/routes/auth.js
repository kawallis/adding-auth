const Router = require('express').Router;
const router = Router();
const User = require('../models/user');
const ensureAuth = require('../authFunctions')();
const tokenService = require('../tokenService');

// function hasEmailAndPass(req, res, next) {
//     const user = req.body;
//     if(!user.email || !user.password) {
//         return next({
//             code: 400,
//             error: 'FOOL... just stop FOOL'
//         });
//     }
//     next();
// }

router 

    .get('/verify', ensureAuth, (req, res) => {
        res.send({ valid: true });
    })

    .post('/signup', (req, res, next) => {
        console.log(req.body.email);
        const email = req.body.email;
        const password = req.body.password;
        delete req.body.password;

        User.exists({email: email})
            .then(thing => {
                if (thing) {
                    throw { code: 400, error: 'theres another fool using ur shizzz try again'};
                }
                const user = new User({email});
                user.generateHash(password);
                return user.save();
            })
            .then(user => tokenService.sign(user))
            .then(token => res.send({token}))
            .catch(next);
    });


module.exports = router;