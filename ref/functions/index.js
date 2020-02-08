const functions = require('firebase-functions');
const utils = require('./utils')

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send(utils.getRandomID());
});
