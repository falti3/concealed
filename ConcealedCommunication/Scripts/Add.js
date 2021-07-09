const { subtle } = require('crypto').webcrypto;

function doStuff(callback, x, y) {
    var m = (x + y) + "";
    var t = generateAesKey().then(function (data) {

        callback(null, { Message: JSON.stringify(data) });
    });
 
}

module.exports = doStuff;

async function generateAesKey(length = 256) {
    const key = await subtle.generateKey({
        name: 'AES-CBC',
        length
    }, true, ['encrypt', 'decrypt']);

    return subtle.exportKey(format = 'jwk', key);
}