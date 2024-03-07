
const users = require('../models/user.server.models');
const social = require('../models/social.server.models');
const Joi = require('joi');

const get_user=(req,res)=>{
    let user_id = parseInt(req.params.user_id);
  

    social.getUser(user_id,(err,result)=>{
     
        if(!result) return res.sendStatus(404);
        if(err) return res.sendStatus(500);
        
        return res.status(200).json(result)

    })
    


}



const follow_user=(req,res)=>{
    let user_id = parseInt(req.params.user_id);
 
    let token = req.get('X-Authorization');
    users.getIdFromToken(token,(err,follower_id)=>{
        if(err)return res.sendStatus(500); 

        social.getUserSimple(user_id,(err)=>{
          
            if(err) return res.sendStatus(404);
            
            social.followUser(user_id,follower_id,(err)=>{
                if(err){ return res.sendStatus(403)
                }else{return res.sendStatus(200);}
            })



        })
        })
        
        
        
        }
    
   
    






const unfollow_user=(req,res)=>{
    let user_id = parseInt(req.params.user_id);
 
    let token = req.get('X-Authorization');
    users.getIdFromToken(token,(err,follower_id)=>{
        if(err)return res.sendStatus(500); 

         social.getUserSimple(user_id,(err)=>{
          
  
           if(err) return res.sendStatus(404);
            social.existFollower(user_id,follower_id,(err)=>{
                if(err)return res.sendStatus(403);
            
                social.unfollowUser(user_id,follower_id,(err)=>{
                    if(err){ return res.sendStatus(403)
                    }else{return res.sendStatus(200);}
                })
    

            })
           


        })
       })
        



}




const search_users=(req,res)=>{
    let query =req.query;

   if(Object.keys(req.query).length==0){
         query={ q: '' };
   } 
    const params=query;
        social.searchUsers(params,(err,results)=>{
            if(err) return res.sendStatus(500);
           
           return res.status(200).send(results);
          
           
          
    
    
        })


}





module.exports = {
    get_user:get_user,
    follow_user:follow_user,
    unfollow_user:unfollow_user,
    search_users:search_users,


   
};