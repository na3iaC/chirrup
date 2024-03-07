<template>
    <div>
      <h1>Edit Post</h1>
      <template v-if="loading">
        <em>Loading post...</em>
      </template>
      <template v-else>
        <form @submit.prevent="handleSubmit">
          <label for="text">Text: </label>
          <input type="text" name="text" v-model="text" />
          <div v-show="submitted && !text">Text is required</div>
          <br /><br />
          <button type="submit" class="save-button">Save</button>
          <div v-if="error" class="error-message">{{ error }}</div>
        </form>
      </template>
    </div>
  </template>
  
  <script>
  import { postService } from "../../services/posts.service";
  
  export default {
    data() {
      return {
        text: "",
        submitted: false,
        error: "",
        loading: true,
        post: null
      };
    },
    created() {
  
      postService.getSinglePost(this.$route.params.id)
        .then((post) => {
          this.post = post
          this.text = post.text
          this.loading = false
        })
        .catch((error) => {
          
          this.loading = false
          console.log("error: ", error)
                    throw "failed to fetch post"
        });
      },
    methods: {
      handleSubmit() {
        this.submitted = true
        const { text } = this
  
        if (!text) {
          return;
        }
  
        postService.editPost(this.$route.params.id, text)
          .then((result) => {
            console.log("posted")
            this.$router.push("/")
          })
          .catch((error) => {
            
            this.submitted=false
            this.erorr=error;
            
          });
        },
         },
        };
  </script>
  <style scoped>
.save-button{
  border-radius:10px;
}



 </style>