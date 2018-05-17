const superagent = require('superagent');
const request = require('request');
const {avatarApi} = require('../endpoints');

const getAvatar = (userId) => superagent
    .get(`${avatarApi}/api/avatar/${userId}`)
    .then(res => res.body);

const uploadAvatar = (userId, upload, size) => new Promise((resolve, reject) => {
    upload.then((file) => {
        const {stream, filename, mimetype} = file;

        request({
            method: 'POST',
            url: `${avatarApi}/api/uploads/upload`,
            qs: {
                userId
            },
            formData: {
                file: {
                    value: stream,
                    options: {
                        filename: filename,
                        contentType: mimetype,
                        knownLength: size
                    }
                }
            },
            headers: {
                'content-encoding': 'chunked'
            }
        }, (err, httpResponse, body) => {
            err ? reject(err) : resolve(JSON.parse(body));
        });
    });
});

module.exports = {
    getAvatar,
    uploadAvatar
};