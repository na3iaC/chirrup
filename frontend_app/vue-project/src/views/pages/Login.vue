<template>
    <div class="login-main">
        <h1>Login</h1>
        <form @submit.prevent="handleSubmit">
            <label for="username">Username: </label>
            <input type="text" name="username" v-model="username" />
            <div v-show="submitted && !username" class="error-message">Username is required</div>
            <br /><br />


            <label for="password">Password: </label>
            <input type="password" name="password" v-model="password"/>
            <div v-show="submitted && !password" class="error-message">Password is required</div>




            <br /><br />
           <!---<p>{{ email+" "+password }}</p>-->
           <div class="login-button-container">
                <button class="login-button" aria-label="Login">Login</button>
            </div>

            <div v-if="error" class="error-message">{{ error }}</div>





        </form>
    </div>


</template>

<script>
import { userService } from "../../services/users.service"

export default{


    data(){
        return{

            username:"",
            password:"",
            submitted: false,
            error:"",
        }


    },
    methods:{
        handleSubmit(e){
            this.submitted=true
            const {username,password}=this

            if(!(username && password)){
                return;
            }
  
          
            userService.login(username,password)
            .then(result =>{
                console.log("Auth successful")
                this.$router.push("/")


            })
            .catch(error =>{
               this.error=error;

                this.submitted=false;
            })

            


         
        }



    }
}




</script>
<style scoped>




  .login-button {
    border-radius:10px;
    
}
  
  .login-button-container {
    display:flex;
    justify-content:center;
    
}

</style>