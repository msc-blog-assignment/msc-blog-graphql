const request = require('superagent');
const {avatarApi} = require('../endpoints');

const getAvatar = (userId) => request
    .get(`${avatarApi}/api/avatar/${userId}`)
    .then(res => res.body);

module.exports = {
    getAvatar
};