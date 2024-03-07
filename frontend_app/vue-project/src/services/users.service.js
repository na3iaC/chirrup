const login = (username, password) =>{
    return fetch("http://localhost:3333/login",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "username": username,
            "password": password
        })


    })
    .then(response => {
        if(response.status === 200){
            return response.json();

        }else if(response.status===400){
            return response.json().then(error => {
                throw error.error_message;
            });
            

        }else{
            throw 'Something went wrong'
        }

    })
    .then(rJson =>{
        localStorage.setItem("user_id",rJson.user_id);
        localStorage.setItem("session_token",rJson.session_token)
        return rJson
    })
    .catch((err) => {
        console.log(err);
        return Promise.reject(err)
    })






}




const logOut=()=>{
    return fetch("http://localhost:3333/logout",
    {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "X-Authorization":localStorage.getItem("session_token")

        }
    })
    .then((response)=>{
        if(response.status === 200){
            localStorage.removeItem("user_id")
            localStorage.removeItem("session_token")
            return 
        }else if (response.status===401){
            console.log(localStorage.getItem("session_token"))
            throw "Not logged in"
        }else{
            throw "Something went wrong"
        }


    }).catch((err)=>{
        
        return Promise.reject(err)



    })



}


const getSingleUser = (userId)=>{
    return fetch(`http://localhost:3333/users/${userId}`)
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

const createUser = (first_name, last_name, username, password) => {
    return fetch("http://localhost:3333/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "first_name": first_name,
            "last_name": last_name,
            "username": username,
            "password": password
        })
    })
    .then(response => {
        if (response.status === 201) {
            return response.json();
        } else if (response.status === 400) {
            return response.json().then(error => {
                throw error.error_message;
            });
            
        } else {
            console.log(response.status)
            throw 'Something went wrong';
        }
    })
    .catch((err) => {
        console.error('Error in createUser:', err);
        return Promise.reject(err);
    });
};


export const userService={
    login,
   
    logOut,
    getSingleUser,
    createUser,
}