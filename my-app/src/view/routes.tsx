import Permissions from 'security/permissions';

const permissions = Permissions.values;

// const privateRoutes = [{
//     path: '/',
//     loader: () => import('./dashboard/DashboardPage'),
//     permissionRequired: null,
//     exact: true
// }].filter(Boolean);

// const publicRoutes = [{
//     path: '/auth/signin',
//     loader: () => import('./auth/SigninPage')
// }].filter(Boolean);

const simpleRoutes = [{
        path: '/',
        loader: () => import('./dashboard/DashboardPage'),
        permissionRequired: null,
        exact: true
    }, {
        path: '/403',
        pathname: '-',
        loader: () => import('./shared/errors/Error403Page')
    }, {
        path: '/500',
        loader: () => import('./shared/errors/Error500Page')
    }, {
        path: '/*/*',
        loader: () => import('./shared/errors/Error404Page')
    }, {
        path: '/auth/signin',
        loader: () => import('./auth/SigninPage')
    }, {
        path: '/',
        loader: () => import('./dashboard/DashboardPage'),
        permissionRequired: null,
        exact: true
    }
].filter(Boolean)

export default {
    // publicRoutes,
    // privateRoutes,
    simpleRoutes
}