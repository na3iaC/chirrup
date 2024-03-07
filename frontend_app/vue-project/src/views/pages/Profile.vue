<template>
    <div class="profile-main">
        <h1>Profile</h1>
       
        <div class="profile-container">
            <div class="user-details-container">
            <p><b>Username:</b> {{ user.username }}</p>
            <p><b>First Name:</b> {{ user.first_name }}</p>
            <p><b>Last Name:</b> {{ user.last_name }}</p>
            <p><b>Followers:</b></p>
            <div v-if="user.followers?.length">
                <ul>
                    <li v-for="follower in user.followers" :key="follower.user_id">
                    <div class="followers-container">
                        <router-link :to="'/users/' + follower.user_id" class="profile-link">
                            {{ follower.username }}
                        </router-link>

                    </div>
                  
                    
                    </li>

                </ul>

            </div>
            <p><b>Following:</b></p>
            <div v-if="user.following?.length">
                <ul>
                    <li v-for="following in user.following" :key="following.user_id">
                       <div class="following-container">
                            <router-link :to="'/users/' + following.user_id" class="profile-link">
                                {{ following.username }}
                            </router-link>


                       </div>
                       
                    </li>
                </ul>
            </div>




    
            <!-- <p>Posts: {{ user.posts }}</p> -->
            <p><b>Posts:</b></p>
            
   </div>
        <div v-if="user.posts?.length">
            <ul>
                <li v-for="post in user.posts" :key="post.post_id">
                   <div class="post-container">
                    <router-link :to="'/posts/' + post.post_id" class="post-link">
                        
                        {{ post.text }}
                    
                    </router-link>

                    <p><b>Number of likes:</b> {{ post.likes.length }}</p>
                
                    <button @click="likeOrUnlike(post.post_id, post)" class="profile-button">
                        <span v-html="whichLabel(post)"></span>
                    </button>
                    <button @click="editPost(post.post_id)" aria-label="Edit Post" class="profile-button">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button @click="deletePost(post.post_id)" aria-label="Delete Post" class="profile-button delete-button">
                        <i class="bi bi-trash"></i>
                    </button>

                   </div>
                 
                </li>
            </ul>
        </div>

        <hr />
        <div class="logout-button-container">
            <button @click="logout" class="logout-button">Logout</button>

        </div>
        <div v-if="error" class="error-message">{{ error }}</div>




        </div>
       
    </div>
</template>

<script>
import { userService } from "../../services/users.service";
import { postService } from "../../services/posts.service";

export default {
    data() {
        return {
            user: [],
            loading: false,
            error: ""
        }
    },
    created() {
        this.fetchUser();
    },
    methods: {
        fetchUser() {
            const userId = localStorage.getItem("user_id");
            if (userId) {
                userService.getSingleUser(userId)
                    .then(user => {
                        this.user = user;
                    })
                    .catch(error => {
                        this.error = "Error fetching user data";
                    });
            } else {
                this.error = "User ID not found in storage";
            }
        },
        logout() {
            userService.logOut()
                .then(() => {
                    console.log("Logged out successfully")
                    this.$router.push('/');
                })
                .catch(error => {
                    console.error("Error logging out:", error);
                    this.error=error;
                });
        },
        editPost(postId) {
            this.$router.push({ path: `/posts/${postId}/edit` });
        },
        deletePost(postId) {
            postService.deletePost(postId)
                .then(() => {
                    console.log("Post deleted successfully");
                    this.fetchUser();
                })
                .catch(error => {
                    console.error("Error deleting post:", error);
                    this.error=error;
                });
        },
        likeOrUnlike(postId, post) {
            if (this.isLiked(post)) {
                this.unlikePost(postId);
            } else {
                this.likePost(postId);
            }
        },
        likePost(postId) {
            const userId = localStorage.getItem("user_id");
            this.loading = true;
            postService.likePost(postId, userId)
                .then(() => {
                    console.log("Liked");
                    this.fetchUser();
                    this.loading = false;
                })
                .catch(error => {
                    console.error("Error liking post:", error);
                    this.loading = false;
                    this.error=error;
                });
        },
        unlikePost(postId) {
            const userId = localStorage.getItem("user_id");
            this.loading = true;
            postService.unlikePost(postId, userId)
                .then(() => {
                    console.log("Unliked");
                    this.fetchUser();
                    this.loading = false;
                })
                .catch(error => {
                    console.error("Error unliking post:", error);
                    this.loading = false;
                  
                    this.error=error;
                });
        },
        isLiked(post) {
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
        whichLabel(post) {
            let buttonLabel;
            if (this.isLiked(post)) {
                buttonLabel = '<i class="bi bi-heart-fill" aria-label="Unlike Post"></i>';
            } else {
                buttonLabel = '<i class="bi bi-heart" aria-label="Like Post"></i>';
            }
            return buttonLabel;
        }
    
    }
}
</script>
<style scoped>
.profile-container {
    background-color: white;
    padding:20px;
    border-radius:10px;
    font-size:18px;
    
    
}
.profile-button{
    border-radius:5px;
    margin-right:10px;
}
.logout-button{
    border-radius:10px;

}
.delete-button:hover, .logout-button:hover{
    background-color:#E33F3C;
}
.logout-button-container {
    display:flex;
    justify-content:center;
}
.post-container, .followers-container, .following-container {
    background-color:#E9F3F2;
    border-radius:10px;
    padding:25px;
    margin-bottom:10px;
 
}
.profile-link, .post-link{
    color:black;
    text-decoration:none; 

}
.profile-link:hover, .post-link:hover {
    text-decoration:underline;
    color:#0880A9;

}

</style>