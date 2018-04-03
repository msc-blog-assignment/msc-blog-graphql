const request = require('superagent');
const {commentsApi} = require('../endpoints');

const getComments = (filter) => request
    .get(`${commentsApi}/api/comments?${filter ? JSON.parse(filter) : ''}`)
    .then(res => res.body);

const getComment = (id) => request
    .get(`${commentsApi}/api/comments/${id}`)
    .then(res => res.body);

const getResponses = (filter) => request
    .get(`${commentsApi}/api/responses?${filter ? JSON.parse(filter) : ''}`)
    .then(res => res.body);

module.exports = {
    getComments,
    getComment,
    getResponses
};