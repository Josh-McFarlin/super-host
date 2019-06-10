import DashboardPage from '../pages/Dashboard/Dashboard';
import CreatePage from '../pages/Create/Create';
import ProxiesPage from '../pages/Proxies/Proxies';
import SettingsPage from '../pages/Settings/Settings';

import DashboardIcon from '@material-ui/icons/Dashboard';
import CreateIcon from '@material-ui/icons/Create';
import ProxiesIcon from '@material-ui/icons/NetworkWifi';
import SettingsIcon from '@material-ui/icons/Settings';


export default {
  dashboard: {
      title: 'Dashboard',
      path: '/',
      component: DashboardPage,
      icon: DashboardIcon
  },
  create: {
      title: 'Create',
      path: '/create',
      component: CreatePage,
      icon: CreateIcon
  },
  proxies: {
      title: 'Proxies',
      path: '/proxies',
      component: ProxiesPage,
      icon: ProxiesIcon
  },
  settings: {
      title: 'Settings',
      path: '/settings',
      component: SettingsPage,
      icon: SettingsIcon
  }
};
