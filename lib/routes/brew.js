const Router = require('express').Router;
const router = Router();
const Brew = require('../models/brew');

router 
    .get('/', (req, res, next) => {
        Brew.find()
            .then(brews => {
                res.send(brews);
            })
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        Brew.findById(req.params.id)
            .then(brews => {
                res.send(brews);
            })
            .catch(next);
    })
    
    .post('/', (req, res, next) => {
        new Brew (req.body)
            .save()
            .then((brewski) => {
                res.send(brewski);
            })  
            .catch(err => next(JSON.stringify(err.errors, true, 2)));
    })
    
    .put('/:id', (req, res, next) => {
        console.log(req.body.abv);
        Brew.findByIdAndUpdate(req.params.id, {$set: {abv: req.body.abv}}, { new: true })
        .then(brew => res.send(brew))
        .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        Brew.findByIdAndRemove(req.params.id)
            .then(() => res.send('Yo drink got drunk'))
            .catch(next);
    });

module.exports = router; 