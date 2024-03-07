const search = (params) =>{
    let url;
    if(params){
        url=`http://localhost:3333/search?q=${params}`;
    }else{
        url=`http://localhost:3333/search`

    }
    
    return fetch(url)
    .then((response)=>{
        if(response.status === 200){
            return response.json();
        }else{
            throw "Something went wrong"
        }



    })
    .then((resJson)=>{
        return resJson


    })
    .catch((err)=>{
        console.log("Err",err)
        return Promise.reject(err)


    })
}
const follow = (userId,followerId)=>{
    return fetch(`http://localhost:3333/users/${userId}/follow`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Authorization":localStorage.getItem("session_token")
        },
        body: JSON.stringify({
            
            "user_id":userId,
            "follower_id":followerId

        })
    })
    .then(response => {
        if (response.status === 200) {
            return;
        }else if(response.status===401){
            throw 'Not signed in!'
            
        }
         else {
            throw 'Something went wrong!';
        }
    })
    .catch((err) => {
        console.error('Error adding follow:', err);
        return Promise.reject(err)
    });






}



const unfollow = (userId,followerId)=>{
    return fetch(`http://localhost:3333/users/${userId}/follow`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "X-Authorization":localStorage.getItem("session_token")
        },
        body: JSON.stringify({
            
            "user_id":userId,
            "follower_id":followerId

        })
    })
    .then(response => {
        if (response.status === 200) {
            return;
        } else {
            throw 'Something went wrong!';
        }
    })
    .catch((err) => {
        console.error('Error deleting follow:', err);
        return Promise.reject(err)
    });






}


export const socialService={
    search,
    follow,
    unfollow
}