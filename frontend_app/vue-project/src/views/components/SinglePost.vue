<template>
    <div>
        <em v-if="loading">Loading post...</em>

        <div v-else>
            <h1>Post </h1>
            <div class="post-container">
                <p>
               <b>Username: </b>


                <router-link :to="'/users/' + post.author.user_id" class="profile-link">
            
                     {{ post.author.username }}
        
                 </router-link>
                </p>
            
                
                <p><b>Name:</b> {{ post.author.first_name + " " + post.author.last_name }}</p>
            
                <p><b>Text:</b> {{ post.text }}</p>
                <p><b>Date: </b>{{ convertDate(post.timestamp) }}</p>
                
                <p><b>Number of likes: </b>{{ post.likes.length }}</p>
                <div v-if="error" class="error-message">{{ error }}</div>
                <!-- <button @click="likePost(post.post_id)" :disabled="isLiked(post)">Like Post</button>
                <button @click="unlikePost(post.post_id)" :disabled="!isLiked(post)">Unlike Post</button> -->

                <button @click="likeOrUnlike(post.post_id)" class="like-button">
                    <span v-html="whichLabel(post)"></span>
                </button>
               
            
                <!-- <p>All post info (for debugging during development):</p>
                <p>{{ post }}</p> -->
                    
                </div>
            
            </div>
            
       
    </div>
</template>

<script>
import { postService } from "../../services/posts.service";
export default {
    data() {
        return {
            post: {},
            loading: true,
            error: ""
        }
     },
    created() {
        this.fetchPost();
    },
    methods: {
        fetchPost(){
            postService.getSinglePost(this.$route.params.id)
        .then((post) => {
            this.post = post;
            this.loading = false; 
        })
        .catch(error => {
            this.error = error;
            this.loading = false; 
        });

        },
        likeOrUnlike(postId) {
            if (this.isLiked(this.post)){
                this.unlikePost(postId);
            } else {
                this.likePost(postId);
            }
        },
        likePost(postId){
            const userId = localStorage.getItem("user_id");
            postService.likePost(postId,userId)
            .then(()=>{
                console.log("liked")
                this.fetchPost();
            })
            .catch((error)=>{
                console.log("err adding like:",error);
                this.error=error;
                
             })
        },
        isLiked(post){
            const userId = localStorage.getItem("user_id");
            let liked = false;
            for (let i = 0; i < post.likes.length; i++) {
                console.log(post.likes[i].user_id)
                console.log(userId)
                if (String(post.likes[i].user_id) === String(userId)) {
                   
                    liked = true;
                  
                }
            }
            console.log(liked)
            return liked;

        
        },


        unlikePost(postId){
            const userId = localStorage.getItem("user_id");
            postService.unlikePost(postId, userId)
                .then(() => {
                    console.log("unliked")
                    this.fetchPost();
                })
                .catch((error) => {
                    console.log("err removing like:", error);
                    this.error=error;
                });
            },
        whichLabel(post){
            let buttonLabel;
            if (this.isLiked(post)) {
                buttonLabel = '<i class="bi bi-heart-fill" aria-label="Unlike Post"></i>';
            } else {
                buttonLabel = '<i class="bi bi-heart" aria-label="Like Post"></i>';
            }
            return buttonLabel;
        },
        convertDate(timestamp){
            const date= new Date(timestamp);
           const converted = date.toLocaleDateString('en-GB');
            return converted
        }



        
    }
}
</script>
<style scoped>
.like-button{
    border-radius:5px;
    padding:3px;
    cursor:pointer;
   width:100%;
}
.post-container{
    padding: 50px;
    background-color:white;
    border-radius: 10px;
    font-size: 17px;
}
.profile-link{
    color:black;
    text-decoration:none; 

}
.profile-link:hover {
    text-decoration:underline;
    color:#0880A9;

}
</style>