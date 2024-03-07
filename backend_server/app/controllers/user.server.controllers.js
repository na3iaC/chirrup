

const users = require("../models/user.server.models");
const Joi = require('joi');

const add_user=(req,res) =>{
    
        const schema = Joi.object({ 
           
            first_name:Joi.string().required(),
            last_name:Joi.string().required(),
            username: Joi.string().required(),
            password:Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/)
            .required(),
            
           
        });

       
    const {error} = schema.validate(req.body);

    if(error) return res.status(400).send({error_message:error.details[0].message})
    console.log(error)
    let user = Object.assign({}, req.body);

    users.addNewUser(user,(err,id) =>{

        if(err){
          
            if(err.errno===19){
              
                return res.status(400).send({error_message:"Username already taken"})
            }
            
        }else{
            return res.status(201).send({user_id:id});
        }
    });

}

const login_user=(req,res)=>{
    const schema=Joi.object({
        username:Joi.string().required(),
        password:Joi.string().required()
    })

const {error}=schema.validate(req.body);
if(error) return res.status(400).send({error_message:"Missing details"});

users.authenticateUser(req.body.username,req.body.password,(err,id)=>{
    

    if(err) return res.status(400).send({error_message:"Wrong details"})
   

    users.getToken(id,(err,token)=>{
        if(err) return res.sendStatus(400)

        if(token){
            return res.status(200).send({user_id: id,session_token:token})
        }else{
            users.setToken(id,(err,token)=>{

                if(err) return res.sendStatus(500)
                return res.status(200).send({user_id:id,session_token:token})
            })
        }



    })



})

}

const logout_user=(req,res) =>{
   
  
    let token=req.get('X-Authorization');
    users.removeToken(token, (err,id)=>{
        if (err){
            return res.sendStatus(500);
        }else{
            return res.sendStatus(200);
        }
    });
   
  


}



    




module.exports = {
    add_user:add_user,
    login_user:login_user,
    logout_user:logout_user

    
};