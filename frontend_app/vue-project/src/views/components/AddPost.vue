<template>
    <div>
        <h1>Add Post</h1>
        <form @submit.prevent="handleSubmit">
         

            <label for="text">Text: </label>
            <input type="text" name="text" v-model="text"/>
            <div v-show="submitted && !text">Text is required</div>




            <br /><br />
       
            <button class="post-button">Post</button>
            <div v-if="error" class="error-message">{{ error }}</div>





        </form>
    </div>


</template>

<script>
import { postService } from "../../services/posts.service"

export default{


    data(){
        return{

            text:"",
            submitted: false,
            error:""
        }


    },
    methods:{
        handleSubmit(e){
            this.submitted=true
            const {text}=this

            if(!(text)){
                return;
            }
  
           
            postService.addPost(text)
            .then(result =>{
                console.log("posted")
                this.$router.push("/")


            })
            .catch(error =>{
                this.error = error
                this.submitted=false;
            })

            


         
        }



    }
}




</script>
<style scoped>
.post-button {
    border-radius:10px;
}



</style>