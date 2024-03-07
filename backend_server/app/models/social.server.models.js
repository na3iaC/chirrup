const db = require("../../database");


const getUser = (user_id,done) => {
    const sql = 'SELECT user_id, first_name, last_name, username FROM users WHERE user_id=?';
    db.get(sql, [user_id], function(err, user_details) {
        if (err) return done(err);
        if (!user_details) return done(404);
       
        const followersSql = 'SELECT u.user_id, u.first_name, u.last_name, u.username FROM users u, followers f WHERE f.user_id=? AND f.follower_id=u.user_id';
        const followers = [];

        db.each(followersSql, [user_id], (err, row) => {
            if (err) return done(err);
            followers.push({
                user_id: row.user_id,
                first_name: row.first_name,
                last_name: row.last_name,
                username: row.username
            });
        }, (err, num_rows) => {
            if (err) return done(err);

            const followingSql = 'SELECT u.user_id, u.first_name, u.last_name, u.username FROM users u, followers f WHERE f.follower_id=? AND f.user_id=u.user_id';
            const following = [];

            db.each(followingSql, [user_id], (err, row) => {
                if (err) return done(err);
                following.push({
                    user_id: row.user_id,
                    first_name: row.first_name,
                    last_name: row.last_name,
                    username: row.username
                });
            }, (err, num_rows) => {
                if (err) return done(err);

                const postSql = `SELECT p.post_id, p.date_published, p.text, u.user_id, u.first_name, u.last_name, u.username 
                    FROM posts p, users u WHERE u.user_id=? AND p.author_id = u.user_id`;
                const allposts = [];

                db.each(postSql, [user_id], (err, post_details) => {
                    if (err) return done(err);
                    
                    allposts.push({
                        post_id: post_details.post_id,
                        timestamp: post_details.date_published,
                        text: post_details.text,
                        author: {
                            user_id: post_details.user_id,
                            first_name: post_details.first_name,
                            last_name: post_details.last_name,
                            username: post_details.username
                        }
                    });
                }, (err, num_row) => {
                    if (err) return done(err);
//check if no posts, as rest of code doesnt execute if its empty
                  
                    if (allposts.length === 0) {
                     
                        return done(null, {
                            user_id: user_details.user_id,
                            first_name: user_details.first_name,
                            last_name: user_details.last_name,
                            username: user_details.username,
                            followers: followers,
                            following: following,
                            posts: []
                        });
                    }

                   
                    let count = 0;
                    let post_len = allposts.length;

                    allposts.forEach((post) => {
                    
                        let likes = [];
                        const likesSql = 'SELECT u.user_id, u.first_name, u.last_name, u.username FROM users u, likes l WHERE l.post_id=? AND l.user_id=u.user_id';
                        
                        db.each(likesSql, [post.post_id], (err, row) => {
                            if (err) return done(err);
                            likes.push({
                                user_id: row.user_id,
                                first_name: row.first_name,
                                last_name: row.last_name,
                                username: row.username
                            });
                        }, (err, num_row) => {
                            if (err) return done(err);

                          
                            post["likes"] = likes;
                           
                            count ++;
                            
                            if (count === post_len) {
                               
                                return done(null, {
                                    user_id: user_details.user_id,
                                    first_name: user_details.first_name,
                                    last_name: user_details.last_name,
                                    username: user_details.username,
                                    followers: followers,
                                    following: following,
                                    posts: allposts
                                });
                            }
                        });
                    });
                });
            });
        });
    });
};













const getUserSimple=(user_id,done)=>{
    const sql='SELECT user_id FROM users WHERE user_id=?';
    db.get(sql,[user_id],(err,user)=>{
   
        if(!user) return done(404);
        if(err) return done(err);
        return done(err);

    })
}



const existFollower=(user_id,follower_id,done)=>{
    const sql='SELECT user_id,follower_id FROM followers WHERE user_id =? AND follower_id=?';
    let values=[user_id,follower_id];

    db.get(sql,values,(err,follower)=>{
            if(err) return done(err);
            if(!follower) return done(403);
           

       return done(err); 
    })
    




}



const followUser=(user_id,follower_id,done)=>{
    const sql='INSERT INTO followers (user_id,follower_id) VALUES (?,?) '
    let values=[user_id,follower_id];

    db.run(sql,values,(err)=>{
        return done(err);
    })




}
const unfollowUser=(user_id,follower_id,done)=>{
    const sql='DELETE FROM followers WHERE user_id=? AND follower_id=?';
    let values=[user_id,follower_id];

    db.run(sql,values,(err)=>{
           

       return done(err); 
    })
    
 


}


const searchUsers=(params,done)=>{
  
    const sql = "SELECT user_id,first_name,last_name,username FROM users WHERE first_name  LIKE '%"+params.q+"%' OR last_name LIKE '%"+params.q+"%' OR username LIKE '%"+params.q+"%'";
    db.all(sql,(err,users)=>{
        if(err) return done(err);
        return done(null, users);



    }
    )

}
 







module.exports={
    getUser:getUser,
    getUserSimple:getUserSimple,
    followUser:followUser,
    existFollower:existFollower,
    unfollowUser:unfollowUser,
    searchUsers:searchUsers


}