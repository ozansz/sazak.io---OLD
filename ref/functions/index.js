const functions = require('firebase-functions');
var admin = require('firebase-admin');

const utils = require('./utils')

var app = admin.initializeApp();

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

genCode = () => {
    var _code = undefined

    while (true) {
        _code = utils.getRandomID()
        console.log('==> trying code:', _code)

        admin.database().ref().child(_code).once('value', (snapshot) => {
            if (!snapshot.exists()) {
                return _code
            }
        })
    }
}

exports.retrieveLink = functions.https.onRequest((request, response) => {
    if (request.query.code === undefined) {
        response.json({
            'error': 'field',
            'extra': 'code'
        })
        return
    }

    admin.database().ref().child(request.query.code).once('value', (snapshot) => {
        if (snapshot.exists()) {
            response.json({
                'code': request.query.code,
                'link': snapshot.val()
            })
        } else {
            response.json({
                'error': 'notfound'
            })
        }
    })
})

exports.generateCode = functions.https.onRequest(async (request, response) => {
    if (request.query.link === undefined) {
        response.json({
            'error': 'field',
            'extra': 'link'
        })
        return
    }

    var code = genCode()
    var snapshot = await admin.database().ref().child(code).set(request.query.link)

    response.json({
        'code': code,
        'link': snapshot.ref.toString()
    })
})