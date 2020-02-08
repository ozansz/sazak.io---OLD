const functions = require('firebase-functions');
var admin = require('firebase-admin');

const utils = require('./utils')

admin.initializeApp();

var db = admin.database()
var ref = db.ref('links')

exports.retrieveLink = functions.https.onRequest((request, response) => {
    if (request.query.code === undefined) {
        response.json({
            'error': 'field',
            'extra': 'code'
        })
        return
    }

    ref.child(request.query.code).once('value', (snapshot) => {
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

exports.generateCode = functions.https.onRequest((request, response) => {
    if (request.query.link === undefined) {
        response.json({
            'error': 'field',
            'extra': 'link'
        })
        return
    }

    console.log('generateCode will start now')

    var code = utils.getRandomID()
    
    ref.child(code).set(request.query.link)

    response.json({
        'code': code,
        'link': request.query.link
    })
})