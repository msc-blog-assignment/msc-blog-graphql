const request = require('superagent');
const {articlesApi} = require('../endpoints');

const getArticle = (articleId) => request
    .get(`${articlesApi}/api/articles/${articleId}`)
    .then(res => res.body);

const getArticles = (filter) => request
    .get(`${articlesApi}/api/articles?filter=${filter ? JSON.stringify(filter): ''}`)
    .then(res => res.body);

module.exports = {
    getArticle,
    getArticles
};