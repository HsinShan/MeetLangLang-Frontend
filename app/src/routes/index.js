import Login from "../pages/login";
import Member from "../pages/member";
import Search from "../pages/search";

const routes = [
  {
    path: "/",
    component: Search,
    exact: true,
  },
  {
    path: "/login",
    component: Login,
    exact: true,
  },
  {
    path: "/member",
    component: Member,
    exact: true,
  },
  {
    path: "/search",
    component: Search,
    exact: true,
  },
];

export default routes;
