const { title } = require("process");

module.exports.home = function(req, res) {
    return res.render('home', {
        title: 'Home'
    });
}