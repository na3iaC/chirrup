<template>
    <div>
        <h1>Sign Up</h1>
        <form @submit.prevent="handleSubmit">
          

            <label for="first_name">First name: </label>
            <input type="text" name="first_name" v-model="first_name" />
            <div v-show="submitted && !first_name" class="error-message">First name is required</div>
            <br /><br />

            <label for="last_name">Last name: </label>
            <input type="text" name="last_name" v-model="last_name" />
            <div v-show="submitted && !last_name" class="error-message">Last name is required</div>




            <br /><br />

            <label for="username">Username: </label>
            <input type="text" name="username" v-model="username" />
            <div v-show="submitted && !username" class="error-message">Username is required</div>
            <br /><br />


            <label for="password">Password: </label>
            <input type="password" name="password" v-model="password"/>
            <div v-show="submitted && !password" class="error-message">Password is required</div>
            <br /><br />
       
            <button class="signup-button">Create Account</button>
            <div v-if="error" class="error-message">{{ error }}</div>
            





        </form>
    </div>


</template>

<script>
import { userService } from "../../services/users.service"

export default{


    data(){
        return{

      
            first_name:"",
            last_name:"",
            username:"",
            password:"",
            submitted: false,
            error:"",
        }


    },
    methods:{
        handleSubmit(e){
            this.error = '';
            this.submitted=true
            const {first_name,last_name,username,password}=this

            if(!(username && password && first_name && last_name)){
                return;
            }
            if (this.isSignedIn) {
                this.error = "You're already signed in!";
                return;
            }

  
            const password_pattern=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/
            if(!(password_pattern.test(password))){
                this.error="Password not strong enough."
                return;
            }
            userService.createUser(first_name,last_name,username,password)
            .then(result =>{
                console.log("user creation successful")
                this.$router.push("/")


            })
            .catch(error =>{
                this.error= error;
                this.submitted=false;
            })

            


         
        }



    },
    computed: {
        isSignedIn() {
            
            return localStorage.getItem('session_token') !== null;
        }
    },
    
}




</script>
<style scoped>
   .signup-button {
    border-radius:10px;
  }
  

</style>
