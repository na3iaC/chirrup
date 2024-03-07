import { createRouter, createWebHistory } from 'vue-router';
import Home from "../views/pages/Home.vue"
import Login from "../views/pages/Login.vue"
import SinglePost from "../views/components/SinglePost.vue"
import Profile from "../views/pages/Profile.vue"
import Search from "../views/pages/Search.vue"
import SingleUser from "../views/components/SingleUser.vue"
import SignUp from "../views/pages/SignUp.vue"
import AddPost from "../views/components/AddPost.vue"
import EditPost from "../views/components/EditPost.vue"
import NotFound from "../views/components/NotFound.vue"


//all my code runs on laptops and pcs ive tried that arent the uni ones
//not sure if its to do with the node version?
//tried researching it but couldnt find anything about it

const ifAuthenticated = (to, from, next) =>{
 
    const loggedIn= localStorage.getItem('session_token');
    console.log(loggedIn)
    if(loggedIn){
        next()
        return
    }
    next('/login')



}
const routes = [
    {path: "/", component: Home },
    {path:"/login", component: Login},
    {path: "/posts/:id", component: SinglePost},
  {path: "/profile",component:Profile, beforeEnter:ifAuthenticated},
  {path:"/search", component:Search},
  {path: "/users/:id",component: SingleUser},
  {path:"/users",component:SignUp},
  {path:"/posts",component:AddPost,beforeEnter:ifAuthenticated},
  {path:"/posts/:id/edit",component:EditPost,beforeEnter:ifAuthenticated},
    {path:"/:pathMatch(.*)*", component:NotFound}
]




const router = createRouter({
    history: createWebHistory(),
    routes,


})


export default router;
