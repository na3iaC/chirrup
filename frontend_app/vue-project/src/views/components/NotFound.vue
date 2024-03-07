<template>
    <div>
        <h1>404 Page Not found</h1>
        <div class="return-button-container">
            <router-link to="/">
                <button aria-label="Return to homepage" class="return-button">Return to homepage</button>
            </router-link>




        </div>
       
    </div>
</template>

<style scoped>
    
    .return-button-container {
        display:flex;
        justify-content:center;
        align-items:center;
        margin-top:20px; 
    }

   
    .return-button {
    background-color:#095963;
    color:white; 
    font-size:18px;
    padding:12px; 
    border-radius:10px;
    cursor:pointer;
  }
  
  .return-button:hover {
    background-color:#022C21; 
    color:white; 
  }
</style>