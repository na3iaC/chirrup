<template>
    <div>
        <h1>Search</h1>
        <div class="search-main">
            <form @submit.prevent="searchUsers" class="search-form">
            <input type="text" v-model="searchInput" placeholder="Enter search text">
            <button type="submit" class="search-button" aria-label="Search"><i class="bi bi-search"></i></button>
        </form>
        <em v-if="loading">Loading users...</em>
        <div>
            <ul v-if="users.length">
            <li v-for="user in users" :key="user.user_id">
                <div class="username-container">
                    <router-link :to="'/users/' + user.user_id" class="user-link">
                    {{ user.username }}
                </router-link>


                </div>
            
            </li>
        </ul>
        <div v-if="error" class="error-message">{{ error }}</div>

        </div>
        

        </div>

        
       
    </div>
</template>

<script>
import { socialService } from "../../services/socials.service"
export default {
    data() {
        return {
            users: [],
            error: "",
            loading: false,
            searchInput: ""
        }
    },
    methods: {
        searchUsers() {
            this.loading = true;
            socialService.search(this.searchInput)
                .then(users => {
                    this.users = users;
                    this.loading = false;
                })
                .catch(error => {
                    this.error = error;
                    this.loading = false;
                });
        }
    }
}
</script>
<style scoped>
.search-form {
    display:flex;
    align-items:center;
    padding:10px;
}
.search-main {
    background-color:white;
    padding:10px;
    border-radius:10px;
    margin-top:10px;
   
}
.search-button{
    padding:10px;
}

.user-link {
    color:black;
    text-decoration:none; 
  }
  
  .user-link:hover {
    text-decoration:underline;
    color:#0880A9;
  }
  
  .username-container{
    background-color:#E9F3F2;
    border-radius:10px;
    padding:25px;
    margin-bottom:10px;
  }
</style>