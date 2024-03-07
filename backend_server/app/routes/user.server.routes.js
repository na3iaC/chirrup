const auth = require('../lib/authentication')
const users = require('../controllers/user.server.controllers')
module.exports=function(app){
    app.route('/users')
    .post(users.add_user);


    app.route('/login')
    .post(users.login_user);

    app.route('/logout')
    .post(auth.isAuthenticated,users.logout_user);


}