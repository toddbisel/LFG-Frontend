import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import UserEdit from "../views/users/UserEdit.vue";
import UserShow from "../views/users/UserShow.vue";
import UserIndex from "../views/users/UserIndex.vue";
import GameIndex from "../views/games/GameIndex.vue";
import GameShow from "../views/games/GameShow.vue";
import GroupIndex from "../views/groups/GroupIndex.vue";
import GroupShow from "../views/groups/GroupShow.vue";
import GroupEdit from "../views/groups/GroupEdit.vue";
import GroupNew from "../views/groups/GroupNew.vue";
import ConversationsIndex from "../views/conversations/Index.vue";
import ConversationsShow from "../views/conversations/Show.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/About.vue")
  },
  {
    path: "/signup",
    name: "signup",
    component: Signup
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/logout",
    name: "logout",
    component: Logout
  },
  {
    path: "/users/:id/edit",
    name: "users-edit",
    component: UserEdit
  },
  {
    path: "/users/:id/",
    name: "users-show",
    component: UserShow
  },
  {
    path: "/users",
    name: "users-index",
    component: UserIndex
  },
  {
    path: "/games",
    name: "games-index",
    component: GameIndex
  },
  {
    path: "/games/:id/",
    name: "games-show",
    component: GameShow
  },
  {
    path: "/groups",
    name: "groups-index",
    component: GroupIndex
  },
  {
    path: "/groups/new",
    name: "groups-new",
    component: GroupNew
  },
  {
    path: "/groups/:id/",
    name: "groups-show",
    component: GroupShow
  },
  {
    path: "/groups/:id/edit",
    name: "groups-edit",
    component: GroupEdit
  },
  {
    path: "/conversations",
    name: "conversations-index",
    component: ConversationsIndex
  },
  {
    path: "/conversations/:id",
    name: "conversations-show",
    component: ConversationsShow
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
