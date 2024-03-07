<template>
    <div class="home-main">
      <div class="container">
        <h1>Welcome to Chirrup!</h1>
        <em v-if="loading">Loading posts...</em>
        
        <div v-if="posts.length">
          <div v-for="post in posts" :key="post.post_id" class="card mb-3 bg-white">
            <div class="card-body">
              <router-link :to="'/posts/' + post.post_id" class="post-link">
                <p class="card-text">{{ post.text }}</p>
              </router-link>
            </div>
          </div>
        </div>
        
        <div v-if="error" class="error-message">{{ error }}</div>
      </div>
      <router-link to="/posts" class="post-link post-button">
        <button class="btn add-post-button" aria-label="Add Post"><i class="bi bi-send"></i></button>
      </router-link>
    </div>
  </template>
  
  <script>
  import { postService } from "../../services/posts.service";
  
  export default {
    data() {
      
      return {
        
        posts: [],
        error: "",
        loading: true
       };
      
    },
   
    mounted() {
      postService.getFeed()
        .then(posts => {
          this.posts = posts;
          this.loading = false;
        })
        .catch(error => {
          this.error = error;
          this.loading = false;
        });
       }
  };
  </script>
  
  <style scoped>
 .home-main {
    padding:30px;
   
    background-color:#9ED5CF;
    
  }
  

  .post-link {
    color:black;
    text-decoration:none; 
  }
  
  .post-link:hover {
    text-decoration:underline;
    color:#0880A9;
  }
  
  .post-button {
    position:fixed;
    bottom:20px;
    right:30px;
  }
  
  .add-post-button {
    background-color:#095963;
    color:white; 
    padding:12px; 
    border-radius:50%; 
    cursor:pointer;
  }
  
  .add-post-button:hover {
    background-color:#022C21; 
    color:white; 
  }
  </style>