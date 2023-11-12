const { connect, connection } = require('mongoose');

const connectionURL = process.env.MONGODB_URI || 'mongodb://localhost/socialnetwork';

connect(connectionURL);
module.exports = connection;