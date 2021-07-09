const { subtle } = require('crypto').webcrypto;

function verifySig(callback, address, timestamp, ciphertext, iv, signature, key) {
    var k = JSON.parse(key);

    importKey(k).then(function (importedKey) {
        var sig = toBuffer(signature);
        var concatenated = address + "." + timestamp + "." + ciphertext + "." + iv;
        var data = toBuffer(concatenated);

        verifySignature(importedKey, sig, data).then(function (data) {
            callback(null, { Message: JSON.stringify(data) });
        });
    });
}

module.exports = verifySig;

async function importKey(keyData) {
    const key = await subtle.importKey('jwk', keyData, {
        name: 'ECDSA',
        namedCurve: 'P-256',
    }, true, ['verify']);
    return key;
}

async function verifySignature(key, signature, data) {
    const verified =
        await subtle.verify(
            {
                name: 'ECDSA', hash: 'SHA-256'
            },
            key,
            signature,
            data);
    return verified;
}

function toBuffer(data) {
    "use strict";
    var dataBuffer = null;
    if (typeof data == "string") {
        dataBuffer = stringToArrayBuffer(data);
    } else if (data instanceof ArrayBuffer || data instanceof Uint8Array) {
        dataBuffer = data;
    } else if (typeof data == "object") {
        dataBuffer = stringToArrayBuffer(JSON.stringify(data));
    }
    return dataBuffer;
}

function stringToArrayBuffer(string) {
    "use strict";
    if (string == null || !(typeof string == "string" || string instanceof ArrayBuffer)) {
        return new ArrayBuffer(0);
    }
    if (typeof string == "string" && string.indexOf("FromArrayBuffer_") == 0) {
        string = string.substring(16);
    }
    if (string instanceof ArrayBuffer) {
        return string;
    }
    var buf = new ArrayBuffer(string.length);
    var bufView = new Uint8Array(buf);
    for (var i = 0, strLen = string.length; i < strLen; i++) {
        bufView[i] = string.charCodeAt(i);
    }
    return buf;
}