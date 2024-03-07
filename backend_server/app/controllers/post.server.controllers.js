
const posts = require("../models/post.server.models");
const users = require('../models/user.server.models');
const Joi = require('joi');
// using bad-words library
//https://www.npmjs.com/package/bad-words


const Filter = require('bad-words')
const filter = new Filter()

const add_post = (req, res) =>{
    const schema = Joi.object({ 
        text: Joi.string().required()
    })

    const { error } = schema.validate(req.body); 
    if (error) return res.sendStatus(400)

    let token = req.get('X-Authorization');
    users.getIdFromToken(token,(err, user_id) =>{
        if (err){
            return res.sendStatus(500);
        }

        let filteredPost = filter.clean(req.body.text);
        let post = {
            text: filteredPost
        }

        posts.addNewPost(post, user_id, (err, id) => {
            if (err) return res.sendStatus(500);
            return res.status(201).send({ post_id: id })
        })
    })
};



const get_post = (req,res) =>{
    let post_id = parseInt(req.params.post_id);

    posts.getSinglePost(post_id,(err,result)=>{
     
        if(!result) return res.sendStatus(404);
        if(err) return res.sendStatus(500);
        
        return res.status(200).json(result)

    })
};

const update_post= (req,res) =>{
    let post_id = parseInt(req.params.post_id);
   // getting current post details stored in database
  //  using our getSinglePost function

    let token = req.get('X-Authorization');
    users.getIdFromToken(token,(err,user_id)=>{
         if(err){
           
             return res.sendStatus(500); 
             
         } 
         posts.getSinglePost(post_id,(err,post) =>{
            if(!post) return res.sendStatus(404);
            if(err) return res.sendStatus(500);
            if(post.author.user_id!==user_id){
                return res.sendStatus(403);
            }
    
            //validate incoming data using Joi
            const schema=Joi.object({
                "text":Joi.string().required()
    
             
        })
       
        const { error }  = schema.validate(req.body);
        if(error) return res.status(400).send(error.details[0].message);
    
        if(post.text === req.body.text){
            return res.sendStatus(200);
        }
    
        posts.updatePost(post_id,req.body.text,(err) =>{
    
            if(err) return res.sendStatus(500);
            return res.sendStatus(200);
        })
    })
    
        
        
        
        
        
        
        
        })

};

const delete_post = (req,res) =>{

    
    let token = req.get('X-Authorization');
    users.getIdFromToken(token,(err,user_id)=>{
         if(err){return res.sendStatus(500); }

         
             let post_id = parseInt(req.params.post_id);
    
    
             posts.getSinglePost(post_id,(err,post) =>{
                if(!post) return res.sendStatus(404);
                if(err) return res.sendStatus(500);
                if(post.author.user_id!==user_id){
                    return res.sendStatus(403);
                }
                
                posts.deletePost(post_id,(err)=>{
                 if(err)return res.sendStatus(500);
                
                 return res.sendStatus(200);
                 
               
          
             })
          
                
            })
            
             
         } )
   

    
};

const add_like = (req,res) =>{
    let post_id = parseInt(req.params.post_id);
    let token = req.get('X-Authorization');
    users.getIdFromToken(token,(err,user_id)=>{
         if(err)return res.sendStatus(500); 

         posts.getSinglePost(post_id,(err,post)=>{
          
            if(!post) return res.sendStatus(404);
            if(err) return res.sendStatus(500);

            posts.likePost(post_id,user_id,(err)=>{
                if(err){ return res.sendStatus(403)
                }else{return res.sendStatus(200);}
            })



        })



    })

    

      
   
   
};


const remove_like=(req,res)=>{
     let post_id = parseInt(req.params.post_id);
   
     let token = req.get('X-Authorization');
     users.getIdFromToken(token,(err,user_id)=>{
          if(err)return res.sendStatus(500); 
 
          posts.getSinglePost(post_id,(err,post)=>{
           
             if(!post) return res.sendStatus(404);
             if(err) return res.sendStatus(500);
             posts.existLikePost(post_id,user_id,(err)=>{
                if(err)return res.sendStatus(403);
                
              
                posts.unlikePost(post_id,user_id,(err)=>{
                 
              
                     if(err)return res.sendStatus(500);
                  
                    return res.sendStatus(200);
                 })


             })
 
             
 
 
 
         })
 
 
 
     })
 
};

module.exports = {
    add_post: add_post,
    get_post: get_post,
    update_post: update_post,
    delete_post: delete_post,
    add_like:add_like,
    remove_like:remove_like,
};