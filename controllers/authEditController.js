const path = require('path');

exports.getEditProfile = (req, res) => {
    res.sendFile(path.join(__dirname, '../community/HTML', 'EditProfile.html'));
}

exports.getEditPassword = (req, res) => {
    res.sendFile(path.join(__dirname, '../community/HTML', 'EditPassword.html'));
}

exports.deleteUser = (req, res) => {
    // res.sendFile(path.join(__dirname, '../community/HTML', 'EditPassword.html'));
}