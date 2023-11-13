const { connect, connection } = require('mongoose');

const connectionURL = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialDB';

connect(connectionURL);
module.exports = connection;