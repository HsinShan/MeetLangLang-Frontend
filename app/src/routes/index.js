import Login from '../pages/login';
import LoginEmail from '../pages/loginemail';
import Member from '../pages/member';
import Search from '../pages/search';
import Map from '../pages/map';
import DrawCards from '../pages/drawcards';
import Discuss from '../pages/discuss';
import DiscussDetail from '../pages/discuss/detail';
import AnimalProfile from '../pages/animalprofile';
import AddDiscuss from '../pages/adddiscuss';
import AddPet from '../pages/pet/add';

const routes = [
    {
        path: '/',
        component: Search,
        exact: true,
    },
    {
        path: '/login',
        component: Login,
        exact: true,
    },
    {
        path: '/login-email',
        component: LoginEmail,
        exact: true,
    },
    {
        path: '/member',
        component: Member,
        exact: true,
    },
    {
        path: '/search',
        component: Search,
        exact: true,
    },
    {
        path: '/map',
        component: Map,
        exact: true,
    },
    {
        path: '/discuss',
        component: Discuss,
        exact: true,
    },
    {
        path: '/drawcards',
        component: DrawCards,
        exact: true,
    },
    {
        path: '/animalprofile',
        component: AnimalProfile,
        exact: true,
    },
    {
        path: '/adddiscuss',
        component: AddDiscuss,
        exact: true,
    },
    {
        path: '/discuss/detail',
        component: DiscussDetail,
        exact: true,
    },
    {
        path: '/pet/add',
        component: AddPet,
        exact: true,
    },

];

export default routes;
