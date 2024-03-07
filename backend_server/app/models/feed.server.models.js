
 const db = require("../../database");


//FIX TAKES 5 YEARS TO LOAD BUT LOGIC CORRECT
// const getFeed = (user_id,done) =>{
//     let postSql = "SELECT p.post_id, p.date_published, p.text, u.user_id, u.first_name, u.last_name, u.username FROM posts p JOIN users u ON u.user_id = p.author_id ";

//     if (user_id) {
//         postSql+= "WHERE p.author_id = ? OR p.author_id IN (SELECT user_id FROM followers WHERE follower_id = ?)";
//     }

//     postSql+= " ORDER BY p.date_published DESC";

//     const allPosts = [];

//     let params = [];
//     if (user_id) {
//         params = [user_id, user_id];
//     }

//     db.each(postSql,params,(err, post_details) => {
//             if (err) return done(err);

//             const post = {
//                 post_id: post_details.post_id,
//                 timestamp: post_details.date_published,
//                 text: post_details.text,
//                 author: {
//                     user_id: post_details.user_id,
//                     first_name: post_details.first_name,
//                     last_name: post_details.last_name,
//                     username: post_details.username
//                 },
//                 likes: [] 
//             };

//             allPosts.push(post);
//         },
//         (err, numRows) =>{
//             if (err) return done(err);

//             let count = 0;
//             const postLen = allPosts.length;

//             allPosts.forEach((post) =>{
//                 const likesSql = "SELECT u.user_id, u.first_name, u.last_name, u.username FROM users u JOIN likes l ON u.user_id = l.user_id WHERE l.post_id = ?";

//                 const params = [post.post_id];

//                 db.all(likesSql,params,(err, rows) =>{
//                         if (err) return done(err);

//                         const postLikes = [];
//                         rows.forEach(row =>{
//                             const like = {
//                                 user_id: row.user_id,
//                                 first_name: row.first_name,
//                                 last_name: row.last_name,
//                                 username: row.username
//                             };
//                             postLikes.push(like);
//                         });

//                         post.likes = postLikes;

//                         count++;

//                         if (count === postLen){
//                             return done(null, allPosts);
//                         }
//                     }
//                 );
//             });
//         }
//     );
// };

const getFeed = (user_id,done) =>{
    let postSql = "SELECT p.post_id, p.date_published, p.text, u.user_id, u.first_name, u.last_name, u.username FROM posts p JOIN users u ON u.user_id = p.author_id";

    if (user_id){
        postSql+= " WHERE p.author_id = ? OR p.author_id IN (SELECT user_id FROM followers WHERE follower_id =?)";
    }

    postSql+= " ORDER BY p.date_published DESC";

    const allPosts = [];
    let params = [];
    if (user_id){
        params = [user_id, user_id];
    }

    db.all(postSql, params, function(err,posts){
        if (err) return done(err);

//array of post ids
        const postIds = [];
        for (let i = 0; i < posts.length; i++){
            postIds.push(posts[i].post_id);
        }
//https://ricardoanderegg.com/posts/sqlite-list-array-parameter-query/
//array same size as number of posts, puts "?," instead of postIds
//to use as a parameterised query
        const likesSql = `SELECT l.post_id, u.user_id, u.first_name, u.last_name, u.username FROM likes l JOIN users u ON l.user_id = u.user_id WHERE l.post_id IN (${Array(postIds.length).fill('?').join(',')})`;

        db.all(likesSql, postIds, function(err, likes){
            if (err) return done(err);

            const postIdLikes = {};
            for (let i = 0; i < likes.length; i++){
                const like = likes[i];
                if (!postIdLikes[like.post_id]) 
                {
                    postIdLikes[like.post_id] = [];
                }
                postIdLikes[like.post_id].push(
                    {
                    user_id: like.user_id,
                    first_name: like.first_name,
                    last_name: like.last_name,
                    username: like.username
                }
                );
            }

            for (let i = 0; i < posts.length; i++){
                const post = posts[i];
                if (postIdLikes[post.post_id]){
                    post.likes = postIdLikes[post.post_id];
                }
                else{
                    post.likes = [];
                }
                allPosts.push(post);
            }

            done(null, allPosts);
        });
    });
};
module.exports = { 
    getFeed: getFeed
};