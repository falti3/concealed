const { subtle } = require('crypto').webcrypto;

function doStuff(callback, key, signature) {
    var k = JSON.parse(key);

    //generateEcKey().then(function (data) {
    importKey(k).then(function (importedKey) {
        var sig = toBuffer(signature);
        var d = toBuffer("test");

        //verifySignature(importedKey, sig, d).then(function (data) {
        //    callback(null, { Message: "24" });
        //});

        //var v2 = verifySignature2(arrayBufferToString(sig));
        //callback(null, { Message: v2});

        verifySignature(importedKey, sig, d).then(function (data) {
            callback(null, { Message: JSON.stringify(data) });
        });

        //callback(null, { Message: JSON.stringify(abc) + "--" + JSON.stringify(k) + "--" + JSON.stringify(signature) }); //importkey funktioniert jetzt wohl!
    });

}

module.exports = doStuff;

async function importKey(keyData) {
    const key = await subtle.importKey('jwk', keyData, {
        name: 'ECDSA',
        namedCurve: 'P-256',
    }, true, ['verify']);
    return key;
}

async function exportKey(key) {
    return subtle.exportKey(format = 'jwk', key);
}

function verifySignature2(key) {
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

async function generateEcKey(namedCurve = 'P-256') {
    const {
        publicKey,
        privateKey
    } = await subtle.generateKey({
        name: 'ECDSA',
        namedCurve,
    }, true, ['sign', 'verify']);
    return subtle.exportKey(format = 'jwk', publicKey);
    return { publicKey, privateKey };
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

function arrayBufferToString(buffer) {
    "use strict";
    if (buffer == null) {
        return "";
    }
    if (typeof buffer == "string") {
        return buffer;
    }
    return String.fromCharCode.apply(null, new Uint8Array(buffer));
}