const superagent = require('superagent');
const multiparty = require('multiparty');
const request = require('request');
const {avatarApi} = require('../endpoints');

const getAvatar = (userId) => superagent
    .get(`${avatarApi}/api/avatar/${userId}`)
    .then(res => res.body);

const uploadAvatar = (userId, file) => new Promise((resolve, reject) => {
    const form = new multiparty.Form();

    form.on('part', part => {
        if (part.filename) {
            request({
                method: 'POST',
                url: `${avatarApi}/api/uploads/upload`,
                qs: {
                    userId
                },
                formData: {
                    file: {
                        value: part,
                        options: {
                            filename: part.filename,
                            contentType: part['content-type'],
                            knownLength: part.byteCount
                        }
                    }
                },
                headers: {
                    'content-encoding': 'chunked'
                }
            }, (err, httpResponse, body) => {
                err ? reject(err) : resolve(JSON.parse(body));
            });
        }
    });

    form.on('error', (err) => {
        reject(err);
    });

    form.parse(file);
});

module.exports = {
    getAvatar,
    uploadAvatar
};