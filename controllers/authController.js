const path = require('path');

exports.getLogin = (req, res) => {
    res.sendFile(path.join(__dirname, '../community', 'Login.html'));
}

exports.getSignup = (req, res) => {
    res.sendFile(path.join(__dirname, 'community', 'Join.html'));
}