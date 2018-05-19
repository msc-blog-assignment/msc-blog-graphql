const request = require('superagent');
const {userApi} = require('../endpoints');

const signup = (username, email, password) => request
    .post(`${userApi}/api/users`)
    .send({username, email, password})
    .then(res => res.body);

const login = (username, password) => request
    .post(`${userApi}/api/users/login`)
    .send({username, password})
    .then(res => res.body);

const logout = (auth) => request
    .post(`${userApi}/api/users/logout`)
    .set('Authorization', auth)
    .then(() => ({ok: true}));

const me = (auth) => request
    .get(`${userApi}/api/me`)
    .set('Authorization', auth)
    .then(res => res.body.info.user);

const getUser = (auth, userId) => request
    .get(`${userApi}/api/users/${userId}`)
    .set('Authorization', auth || '')
    .then(res => res.body);

const getUsers = (auth, filter) => request
    .get(`${userApi}/api/users?filter=${filter ? JSON.stringify(filter) : ''}`)
    .set('Authorization', auth || '')
    .then(res => res.body);

module.exports = {
    signup,
    login,
    logout,
    me,
    getUser,
    getUsers
};