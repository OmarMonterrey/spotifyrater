const functions = require("firebase-functions");
const search = require('./core/search').function;
exports.function = functions.https.onCall(async (data, context) => {
    var query = data.query.replace(/[^0-9a-z\-_ .,]/ig, '');
    var results = await search(query);
    return results;
});