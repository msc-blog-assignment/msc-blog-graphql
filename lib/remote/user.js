const request = require('superagent');
const {userApi} = require('../endpoints');

const login = (username, password) => request
    .post(`${userApi}/api/users/login`)
    .send({username, password})
    .then(res => res.body);

const getUser = (auth, userId) => request
    .get(`${userApi}/api/users/${userId}`)
    .set('Authorization', auth)
    .then(res => res.body);

const getUsers = (auth, filter) => request
    .get(`${userApi}/api/users?filter=${filter ? JSON.stringify(filter) : ''}`)
    .set('Authorization', auth)
    .then(res => res.body);

module.exports = {
    login,
    getUser,
    getUsers
};