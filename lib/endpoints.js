const cfenv = require('cfenv');
const packageJson = require('../package');
const sync = require('promise-synchronizer');
const consul = require('consul')({
    host: process.env.SERVICE_DISCOVERY_HOST,
    port: process.env.SERVICE_DISCOVERY_PORT || '/',
    secure: !process.env.SERVICE_DISCOVERY_PORT,
    promisify: true
});

const serviceDiscovery = consul.agent.service.register({
    name: packageJson.name,
    address: cfenv.getAppEnv().url
}).then(() => {
    return consul.agent.service.list();
});

const endpoints = sync(serviceDiscovery);

const userApi = endpoints['msc-blog-user-api'].Address;
const articlesApi = endpoints['msc-blog-article-api'].Address;
const commentsApi = endpoints['msc-blog-comments-api'].Address;

console.log(endpoints);

module.exports = {
    userApi,
    articlesApi,
    commentsApi
};