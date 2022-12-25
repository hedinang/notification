const mongodb = require('../model/index')
async function addUser(api) {
    console.log('aaaa')
    let result =  await mongodb.Api.create(api);
    return result
}
module.exports = {
    addUser
}