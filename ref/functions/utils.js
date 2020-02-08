var crypto = require('crypto')
const uuidv4 = require('uuid/v4')

exports.getRandomID = () => {
    let md5sum = crypto.createHash('md5')
    md5sum.update(uuidv4())
    
    return md5sum.digest('hex').slice(0, 6)
}