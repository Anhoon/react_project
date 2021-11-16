import React, { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon,
  List as ListIcon
} from 'react-feather';
import NavItem from './NavItem';

const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith'
};

// const items = [
//   {
//     href: '/app/dashboard',
//     icon: BarChartIcon,
//     title: 'Dashboard'
//   },
//   {
//     href: '/app/customers',
//     icon: UsersIcon,
//     title: 'Customers'
//   },
//   {
//     href: '/app/products',
//     icon: ShoppingBagIcon,
//     title: 'Products'
//   },
//   {
//     href: '/app/account',
//     icon: UserIcon,
//     title: 'Account'
//   },
//   {
//     href: '/app/settings',
//     icon: SettingsIcon,
//     title: 'Settings'
//   },
//   {
//     href: '/login',
//     icon: LockIcon,
//     title: 'Login'
//   },
//   {
//     href: '/register',
//     icon: UserPlusIcon,
//     title: 'Register'
//   },
//   {
//     href: '/404',
//     icon: AlertCircleIcon,
//     title: 'Error'
//   }
// ];

const items = [
  {
    href: '/view/board/list',
    icon: ListIcon,
    title: 'Board'
  },
  {
    href: '/view/customer',
    icon: ListIcon,
    title: 'Customer'
  },
  {
    href: '/view/dashBoard',
    icon: ListIcon,
    title: 'DashBoard'
  },
  {
    href: '/view/account',
    icon: ListIcon,
    title: 'Account'
  },
  {
    href: '/view/settings',
    icon: ListIcon,
    title: 'Settings'
  },
  {
    href: '/view/notFound',
    icon: ListIcon,
    title: 'NotFound'
  }
  
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Divider />
      <Box p={2}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default NavBar;
