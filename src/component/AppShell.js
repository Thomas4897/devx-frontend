/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { createStyles, Navbar, Group, Code } from '@mantine/core';
import {
  SwitchHorizontal,
  Logout,
  Home2,
  UserCircle,
  DatabaseImport,
} from 'tabler-icons-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../redux/userState'
import APIaxios from '../Axios';
import { ButtonToggle } from './ButtonToggle';

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef('icon');
  return {
    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
      borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
        }`,
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
        }`,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      fontSize: theme.fontSizes.sm,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        },
      },
    },

    linkIcon: {
      ref: icon,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      '&, &:hover': {
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.fn.rgba(theme.colors[theme.primaryColor][8], 0.25)
            : theme.colors[theme.primaryColor][0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.colors[theme.primaryColor][7],
        [`& .${icon}`]: {
          color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 5 : 7],
        },
      },
    },
  };
});


export default function AppShell() {
  const { user, logOut } = useUser();
  const navigate = useNavigate();
  const { classes, cx } = useStyles();
  const [active, setActive] = useState('Billing');

  let data = [];

  user ? data = [

    { link: '/', label: 'Home', icon: Home2 },
    { link: '/user-page', label: 'User Page', icon: UserCircle },
    { link: '/add-portfolio-card', label: 'Add Portfolio Card', icon: DatabaseImport }
  ]
    :
    data = [
      { link: '/login', label: 'Login / Register', icon: UserCircle },
      // { link: '', label: 'SSH Keys', icon: Key },
      // { link: '', label: 'Authentication', icon: TwoFA },
      // { link: '', label: 'Other Settings', icon: Settings },
    ];

  const handleSignOut = () => {
    // lougout the user
    APIaxios.get('/users/sign-out')
      .then(() => {
        // Remove the user data from the user context when a user logs out
        logOut();
        navigate('/')
        console.log('user logged out.');

      });
  };

  const links = data.map((item) => (
    <a
      className={cx(classes.link, { [classes.linkActive]: item.label === active })}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
        navigate(item.link)
      }}
    >
      <item.icon className={classes.linkIcon} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <Navbar style={{}} height="100vh" width={{ sm: 300 }} p="md">
      <Navbar.Section grow>
        <Group className={classes.header} position="apart">
          DevX
          <Code sx={{ fontWeight: 700 }}>v1</Code>
        </Group>
        {links}
      </Navbar.Section>

      {user ? <Navbar.Section className={classes.footer}>
        <a href="#" className={classes.link} onClick={(event) => { event.preventDefault(); navigate("/login"); }}>
          <SwitchHorizontal className={classes.linkIcon} />
          <span>Change account</span>
        </a>

        <a href="#" className={classes.link}
          onClick={(event) => {
            event.preventDefault();
            handleSignOut();
          }}>
          <Logout className={classes.linkIcon} />
          <span>Logout</span>
        </a>
        <ButtonToggle />
      </Navbar.Section>
        :
        <Navbar.Section className={classes.footer}>
          <ButtonToggle />
        </Navbar.Section>
      }

    </Navbar>
  );
}