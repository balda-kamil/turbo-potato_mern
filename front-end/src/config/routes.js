
import RestaurantsList from "../components/restaurants-list";
import Login from "../components/login";
import Register from "../components/register";
import RegistartionThankYou from "../components/registration-thankyou";
import Dashboard from "../components/dashboard";
import NotFound from "../components/404";

const routes = [
  {
    path: '/restaurants',
    component: RestaurantsList,
    isPrivate: false,
    exact: true
  },
  {
    path: '/login',
    component: Login,
    isPrivate: false,
  },
  {
    path: '/register',
    component: Register,
    isPrivate: false,
  },
  {
    path: '/registration-thankyou',
    component: RegistartionThankYou,
    isPrivate: false,
  },
  {
    path: '/dashboard',
    component: Dashboard,
    isPrivate: true,
  },
  {
    path: '/*',
    component: NotFound,
    isPrivate: false,
  },
];
 
 
export default routes;