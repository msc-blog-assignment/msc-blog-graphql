const request = require('superagent');
const {commentsApi} = require('../endpoints');

const getComments = (filter) => request
        .get(`${commentsApi}/api/comments?filter=${filter ? JSON.stringify(filter) : ''}`)
        .then(res => res.body);

const getComment = (id) => request
    .get(`${commentsApi}/api/comments/${id}`)
    .then(res => res.body);

const getResponses = (filter) => request
    .get(`${commentsApi}/api/responses?filter=${filter ? JSON.stringify(filter) : ''}`)
    .then(res => res.body);

const addComment = (userId, articleId, comment) => request
    .post(`${commentsApi}/api/comments`)
    .send({userId, articleId, comment})
    .then(res => res.body);

const respondToComment = (userId, articleId, commentId, response) => request
    .post(`${commentsApi}/api/responses`)
    .send({userId, articleId, commentId, response})
    .then(res => res.body);

module.exports = {
    getComments,
    getComment,
    getResponses,
    addComment,
    respondToComment
};