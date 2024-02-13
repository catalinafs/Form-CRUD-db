const db = require('./config/instance');
const User = require('./config/models/user')(db);

const getRequest = (req, res) => {
    User.findAll().then((dogs) => {
        dogs.forEach(dog => {
            console.log(dog.toJSON())
        });
    });
}

module.exports = getRequest;