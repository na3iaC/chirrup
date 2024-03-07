const db = require("../../database");
const crypto = require('crypto');





const addNewUser = (user,done)=>{
    //create salt
    const salt = crypto.randomBytes(64);
    //convert to hash
    const hash = getHash(user.password,salt);
    
    
    const sql='INSERT INTO users (first_name, last_name, username, password,salt) VALUES (?,?,?,?,?)';
    let values=[user.first_name,user.last_name,user.username,hash,salt.toString('hex')];

    db.run(sql,values,function(err){
        if(err) return done(err);
        
      return done(err, this.lastID)

    });

}

//function to convert to hash
const getHash=function(password,salt){
    return crypto.pbkdf2Sync(password,salt,100000,256,'sha256').toString('hex');  

}

const authenticateUser=(username,password,done)=>{
    //passes incoming password and salt from db to gethash function
    const sql='SELECT user_id, password, salt FROM users WHERE username=?';
    db.get(sql,[username],(err,row)=>{
        if(err) return done(err)
        if(!row) return done(404)  //wrong username

        if(row.salt===null) row.salt=''

        let salt=Buffer.from(row.salt,'hex')
        //checks if generated hash is same as db hash


        if(row.password===getHash(password,salt)){
            return done(false,row.user_id)

        }else{
            return done(404)//wrong password
        }

    })


}

const setToken=(id,done)=>{
    let token=crypto.randomBytes(16).toString('hex');

    const sql='UPDATE users SET session_token=? WHERE user_id=?'

    db.run(sql,[token,id],(err)=>{

        return done(err,token)
    })
}

const getToken = (id,done)=>{
    const sql = 'SELECT session_token FROM users WHERE user_id=?' 
    db.get(sql,[id],(err, row)=>{
          if (row && row.session_token){
            return done(null, row.session_token);
          }else{
            return done(null, null);
          } 
        }
    );
};





const removeToken=(token,done)=>{
    const sql='UPDATE users SET session_token=null WHERE session_token=?'

    db.run(sql,[token],(err)=>{
        return done(err)
    })
}



const getIdFromToken = function(token,done){
    if(token===undefined||token===null)
    return done(404);
else{
    const sql='SELECT user_id FROM users WHERE session_token=?'
    const params=[token]
    db.get(sql,params,(err,row)=>{
        if(err) return done(err);
        if (row)
        return done(null, row.user_id);
    return done(err, null);


    })

}
   
   

}

module.exports={
    addNewUser:addNewUser,
    authenticateUser:authenticateUser,
    setToken:setToken,
    getToken:getToken,
    removeToken:removeToken,
    getIdFromToken:getIdFromToken

}
