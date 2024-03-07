const auth = require('../lib/authentication')
const social = require('../controllers/social.server.controllers')


module.exports = function(app){
    app.route('/users/:user_id')
        .get(social.get_user);
     
    
    app.route('/users/:user_id/follow')
        .post(auth.isAuthenticated,social.follow_user)
     
        .delete(auth.isAuthenticated,social.unfollow_user);

    app.route('/search')
        .get(social.search_users)
       





}