import DashboardIcon from '@material-ui/icons/Dashboard';
import ProjectsIcon from '@material-ui/icons/Apps';
import CreateIcon from '@material-ui/icons/Create';
import ProxiesIcon from '@material-ui/icons/NetworkWifi';
import SettingsIcon from '@material-ui/icons/Settings';

import DashboardPage from '../pages/Dashboard/Dashboard';
import ProjectsPage from '../pages/Projects';
import CreatePage from '../pages/Create/Create';
import ProxiesPage from '../pages/Proxies/Proxies';
import SettingsPage from '../pages/Settings/Settings';


export default {
    dashboard: {
        title: 'Dashboard',
        path: '/',
        component: DashboardPage,
        icon: DashboardIcon,
        sidebar: true
    },
    projects: {
        title: 'Projects',
        path: '/projects',
        component: ProjectsPage,
        icon: ProjectsIcon,
        sidebar: true
    },
    create: {
        title: 'Create',
        path: '/create',
        component: CreatePage,
        icon: CreateIcon,
        sidebar: false
    },
    proxies: {
        title: 'Proxies',
        path: '/proxies',
        component: ProxiesPage,
        icon: ProxiesIcon,
        sidebar: true
    },
    settings: {
        title: 'Settings',
        path: '/settings',
        component: SettingsPage,
        icon: SettingsIcon,
        sidebar: true
    }
};
