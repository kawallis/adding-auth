const db = require('./_db');
const request = require('./_request');
const assert = require('chai').assert;

describe('Brews api', () => {
    before(db.drop);

    let token = {
        Authorization: ''
    };

    let user = {
        email: 'jojo@jo.com',
        password: 'idontknow'
    };

    before(() => {
        return request.post('/api/auth/signup')
            .send({ email: 'me@me.com', password: 'abc' })
            .then(res => {
                token.Authorization = res.body.token;
            });
    });

    it('initial /GET returns no brewski', () => {
        return request.get('/api/brew')
            .set(token)
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
            .set(token)
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
            .set(token)
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
            .set(token)
            .send(obj)
            .then(brewski => {
                let {body} = brewski;
                assert.equal(body.abv, obj.abv);
            });
    });

    it('deletes a brewski', () => {
        return request.delete(`/api/brew/${brew._id}`)
            .set(token)
            .then(message => {
                assert.equal('Yo drink got drunk', message.text);
            });
    });
});