const cfenv = require('cfenv');
const consul = require('consul');
const packageJson = require('../package');
const sync = require('promise-synchronizer');
const appEnv = cfenv.getAppEnv();

let host = '';
let port = '';
let secure = false;

if (appEnv.isLocal) {
    const {SERVICE_DISCOVERY_HOST, SERVICE_DISCOVERY_PORT} = process.env;

    host = SERVICE_DISCOVERY_HOST;
    port = SERVICE_DISCOVERY_PORT;
} else {
    const service = appEnv.getService('consul-service-discovery');

    host = service.credentials.host;
    port = service.credentials.port;
    secure = service.credentials.secure;
}

const discoveryService = consul({host, port, secure, promisify: true});

const serviceDiscovery = discoveryService.agent.service.register({
    name: packageJson.name,
    address: appEnv.isLocal ? process.env.HOSTNAME : appEnv.url
}).then(() => {
    return discoveryService.agent.service.list();
});

const endpoints = sync(serviceDiscovery);

const userApi = endpoints['msc-blog-user-api'].Address;
const articlesApi = endpoints['msc-blog-article-api'].Address;
const commentsApi = endpoints['msc-blog-comments-api'].Address;

module.exports = {
    userApi,
    articlesApi,
    commentsApi
};