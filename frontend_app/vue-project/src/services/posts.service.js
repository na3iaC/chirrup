const getFeed = () =>{
    const headers = {
        "Content-Type": "application/json"
    };
    

    const sessionToken= localStorage.getItem("session_token");
    if (sessionToken){
        headers["X-Authorization"] = sessionToken;
        
    }
    console.log(headers)

    return fetch("http://localhost:3333/feed",
    {
        method: "GET",
        headers: headers,
       
    })
    .then((response) =>{
        if (response.status === 200) {
            console.log(response.status)

            return response.json();
        } else {
            console.log(response.status)

            throw "Something went wrong";
        }
    })
    .then((resJson) => {
        console.log(resJson)

        return resJson;
    })
    .catch((err) => {

        return Promise.reject(err);


    });
}

const getSinglePost = (postId) =>{
    return fetch(`http://localhost:3333/posts/${postId}`)
    .then((response)=>{
        if(response.status === 200){
            return response.json();
        }
        else{
            throw "Something went wrong"
        }



    })
    .then((resJson)=>{
        return resJson


    })
    .catch((err)=>{
       
        return Promise.reject(err)


    })




    
}

const addPost = (text) => {
    return fetch("http://localhost:3333/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Authorization":localStorage.getItem("session_token")
        },
        body: JSON.stringify({
            "text": text,
        })
    })
    .then(response => {
        if (response.status === 201) {
            return response.json();
        } else {
            throw 'Something went wrong!';
        }
    })
    .catch(err => {
        console.error('Error adding post:', err);
        return Promise.reject(err)
    });
}
const editPost=(postId, text)=>{
    return fetch(`http://localhost:3333/posts/${postId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "X-Authorization":localStorage.getItem("session_token")
        },
        body: JSON.stringify({
           
            "text": text,
        })
    })
    .then(response => {
        if (response.status === 200) {
            return ;
        } else {
            throw 'Something went wrong!';
        }
    })
    .catch(err => {
        console.error('Error editing post:', err);
        return Promise.reject(err)
    });
}
const deletePost=(postId)=>{
    return fetch(`http://localhost:3333/posts/${postId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "X-Authorization":localStorage.getItem("session_token")
        },
      
    })
    .then(response => {
        if (response.status === 200) {
            return ;
        } else {
            console.log(response.status)
            throw 'Something went wrong!'
        }
    })
    .catch((err) =>{
        console.error('Error deleting post:', err);
        return Promise.reject(err)
    });
}


const likePost = (postId,userId) => {
    return fetch(`http://localhost:3333/posts/${postId}/like`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Authorization":localStorage.getItem("session_token")
        },
        body: JSON.stringify({
            "post_id": postId,
            "user_id":userId

        })
    })
    .then(response => {
        if (response.status === 200) {
            return;
        }else if(response.status===401){
            throw 'Not signed in!'
        } 
        else {
            throw 'Something went wrong';
        }
    })
    .catch((err) => {
        console.error('Error adding like:', err);
        throw err;
    });
}


const unlikePost = (postId,userId) => {
    return fetch(`http://localhost:3333/posts/${postId}/like`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "X-Authorization":localStorage.getItem("session_token")
        },
        body: JSON.stringify({
            "post_id": postId,
            "user_id":userId

        })
    })
    .then(response => {
        if (response.status === 200) {
            return;
        } else {
            console.log(response.status);
            throw 'Something went wrong!';
            
        }
    })
    .catch((err) => {
        console.error('Error removing like:', err);
        return Promise.reject(err)
    });
}






export const postService={
    getFeed,
    getSinglePost,
    addPost,
    editPost,
    deletePost,
    likePost,
    unlikePost
}