<template>
  <div class="page-container">
    <!-- chirrup png https://www.iconfinder.com/icons/3672146/bird_doodle_nature_icon-->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand" >
          <img src="../chirrup.png" alt="Chirrup Logo" width="40px" height="40px">
          Chirrup
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/login">Login</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/profile">Profile</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/search">Search</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/users">Sign Up</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {

};
</script>

<style>
label, .error-message{
    font-weight:bold;
  }
input {
    width:100%;
    padding:10px; 
  }
.error-message {
    color: red;
    margin-top:5px;
   
    font-size:18px;
  }
h1{
   
    text-align:center;
    padding:20px;
  }
 .page-container{
  min-height:100vh;
  background-color:#ABDFDB;
  
}
body, .navbar-brand, .nav-link{
  font-family: "Helvetica Neue", Helvetica, sans-serif;
}
@media screen and (max-width: 768px) {
  .page-container, .navbar-brand, .nav-link {
    font-size:14px;
  }
}

@media screen and (min-width: 768px) and (max-width: 1024px) {
  .page-container, .navbar-brand, .nav-link{
    font-size:16px; 
  }
}

@media screen and (min-width: 1024px){
  .page-container, .navbar-brand, .nav-link{
    font-size:16px; 
  }
}

button{
    background-color:#095963;
    color:white; 
    padding:7px;
    cursor:pointer;
    border-radius:10px;
  }
  
  button:hover{
    background-color:#022C21; 
    color:white; 
  }
  form {
    padding:50px;
    background-color: white;
    border-radius:10px;
    font-size:17px;
   
  }


</style>