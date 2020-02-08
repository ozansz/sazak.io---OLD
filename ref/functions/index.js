const functions = require('firebase-functions');
var admin = require('firebase-admin');

//const cors = require('cors')({origin: true});

const utils = require('./utils')

admin.initializeApp();

var db = admin.database()
var ref = db.ref('links')

exports.retrieveLink = functions.https.onRequest((request, response) => {
    if (request.query.code === undefined) {
        response.set('Access-Control-Allow-Origin', '*');
        response.json({
            'error': 'field',
            'extra': 'code'
        })
        return
    }

    if (request.query.code.includes('.') || request.query.code.includes('#') || request.query.code.includes('$') || request.query.code.includes('[') || request.query.code.includes(']')) {
        response.set('Access-Control-Allow-Origin', '*');
        response.json({
            'error': 'invcode'
        })
        return
    }

    ref.child(request.query.code).once('value', (snapshot) => {
        if (snapshot.exists()) {
            response.set('Access-Control-Allow-Origin', '*');
            response.json({
                'code': request.query.code,
                'link': snapshot.val()
            })
        } else {
            response.set('Access-Control-Allow-Origin', '*');
            response.json({
                'error': 'notfound'
            })
        }
    })
})

exports.generateCode = functions.https.onRequest((request, response) => {
    if (request.query.link === undefined) {
        response.set('Access-Control-Allow-Origin', '*');
        response.json({
            'error': 'field',
            'extra': 'link'
        })
        return
    }

    var code = utils.getRandomID()
    
    ref.child(code).set(request.query.link)

    response.set('Access-Control-Allow-Origin', '*');
    response.json({
        'code': code,
        'link': request.query.link
    })
})