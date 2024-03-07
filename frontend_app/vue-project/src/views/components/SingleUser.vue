<template>
    <div>
        <em v-if="user.loading">Loading user...</em>

        <div v-else>
            <h1>User</h1>
            <div class="user-container">
                <p><b>Username: </b>{{ user.username }}</p>
                <p><b>First Name: </b>{{ user.first_name }}</p>
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
                

            <div v-if="user.posts?.length">
                <ul>
                    <li v-for="post in user.posts" :key="post.post_id">
                    <div class="post-container">
                        <router-link :to="'/posts/' + post.post_id" class="post-link">
                            
                            {{ post.text }}
                        
                        </router-link>
                        

                        <p><br/><b>Number of likes:</b> {{ post.likes.length }}</p>
                    
                        

                    </div>
                    
                    </li>
                </ul>
            </div>
                
                <div class="follow-button-container">
                    <button @click="followOrUnfollow(user.user_id)" class="follow-button">{{ whichLabel(user) }}</button>

                </div>
               
                <div v-if="error" class="error-message">{{ error }}</div>

        
         


                
            </div>
         
        
    </div>



    </div>




</template>
<script>
import { socialService } from "../../services/socials.service";
import { userService } from "../../services/users.service";
export default {
    data(){
        return{
            user:[],
            error:"",
            loading:true
        }
    },
    created(){
        this.fetchUser();
    
    },
    methods:{
        fetchUser(){
            this.user.loading = true;

            userService.getSingleUser(this.$route.params.id)
            .then((user) =>{
                this.user=user;
                this.loading=false
            
            
            })
            .catch(error =>{
                this.error=error;
                this.loading=false
            });





        },
        followOrUnfollow(userId){
            if (this.isFollowed(this.user)) {
                this.unfollow(userId);
            } else{
                this.follow(userId);
            }



        },
        follow(userId){
            const followerId=localStorage.getItem("user_id");
            socialService.follow(userId,followerId)
            .then(()=>{
                console.log("followed")
                this.fetchUser();
            })
            .catch((error)=>{
                console.log("err adding follow:",error);
                this.error=error;
            })

        },
        isFollowed(user){
            const followerId = localStorage.getItem("user_id");
            let followed = false;
            for (let i = 0; i < user.followers.length; i++){
                console.log(user.followers[i].user_id)
                
                if (String(user.followers[i].user_id) === String(followerId)) {
                   
                    followed = true;
                  
                }
            }
            console.log(followed)
            return followed;


        },

        unfollow(userId){
            const followerId = localStorage.getItem("user_id");
            socialService.unfollow(userId, followerId)
                .then(() => {
                    console.log("unfollowed")
                    this.fetchUser();
                })
                .catch((error) => {
                    console.log("err removing follow:", error);
                    this.error=error;
                });




        },
        whichLabel(user){
            let buttonLabel;
            if (this.isFollowed(user)) {
                buttonLabel = 'Unfollow';
            } else{
                buttonLabel = 'Follow';
            }
            return buttonLabel;
           
        },
     
    },
    //when the route changes (clicking on following and follwers) calls fetch user again so the page actually reloads
    watch: {
        '$route': 'fetchUser'
    }
  

}


</script>
<style scoped>
.user-container{
    background-color:white;
    padding: 20px;
    border-radius: 10px;
    font-size:18px;
        
}
.post-container, .followers-container, .following-container {
    background-color:#E9F3F2;
    border-radius:10px;
    padding:25px;
    margin-bottom: 10px;
 
}
.profile-link, .post-link{
    color:black;
    text-decoration:none; 

}
.profile-link:hover, .post-link:hover {
    text-decoration:underline;
    color:#0880A9;

}
.follow-button{
    border-radius:10px;

}

.follow-button-container {
    display: flex;
    justify-content: center;

}
</style>