import Login from '../pages/login';
import Member from '../pages/member';
import Search from '../pages/search';
import Map from '../pages/map';
import Share from '../pages/share';
import Discuss from '../pages/discuss';
import AnimalProfile from '../pages/animalprofile';
import AddDiscuss from '../pages/adddiscuss';

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
        path: '/share',
        component: Share,
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
];

export default routes;
