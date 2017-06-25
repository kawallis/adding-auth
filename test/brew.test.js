const db = require('./_db');
const request = require('./_request');
const assert = require('chai').assert;

describe('Brews api', () => {
    before(db.drop);

    it('initial /GET returns no brewski', () => {
        return request.get('/api/brew')
            .then(brews => {
                console.log(brews.body);
                assert.deepEqual(brews.body.length, 0);
            });
    });

    let brew = null;
    it('posts a brewski to the db', () => {
        brew = {
            name: 'Coors',
            abv: 4.5,
            location: 'Rocky Mountains'
        };

        return request.post('/api/brew')
            .send(brew)
            .then(brewski => {
                let {body} = brewski;
                let {_id} = body;
                brew.__v = 0;
                brew._id = _id;
                assert.deepEqual(brew, body);
            });
    });

    it('gets a brew by its id', () => {
        return request.get(`/api/brew/${brew._id}`)
            .then(brewski => {
                let {body} = brewski;
                assert.deepEqual(body, brew);
            });
    });

    it('updates a brewski', () => {
        let obj = {
            abv: 3.4
        };
        return request.put(`/api/brew/${brew._id}`)
            .send(obj)
            .then(brewski => {
                let {body} = brewski;
                assert.equal(body.abv, obj.abv);
            });
    });

    it('deletes a brewski', () => {
        return request.delete(`/api/brew/${brew._id}`)
            .then(message => {
                assert.equal('Yo drink got drunk', message.text);
            });
    });
});