import { memo, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { default as MenuIcon } from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useRouter } from 'next/router';
import { useAuth } from '../../hooks/useAuth';

const useStyles = makeStyles((theme) => ({
  headerAppBar: {
    backgroundColor: theme.palette.background.default,
  },
  title: {
    flexGrow: 1,
    textTransform: 'capitalize',
    userSelect: 'none',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  list: {
    width: 250,
  },
}));

const NavBar = () => {
  const router = useRouter();
  const styles = useStyles();
  const [showPanel, setShowPanel] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const openMenu = Boolean(menuAnchorEl);
  let currentRoute = router.route?.replace('/', '');
  if (router.route === '/') {
    currentRoute = 'Main';
  }
  const [auth] = useAuth();

  const togglePanelDrawer = () => {
    setShowPanel(!showPanel);
  };

  const handleLogout = () => {
    localStorage.removeItem('auth');
    localStorage.removeItem('username');
    router.push('/login');
  };

  const handleMenu = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setMenuAnchorEl(null);
  };

  return (
    <AppBar
      className={styles.headerAppBar}
      position="sticky"
      variant="elevation"
      color="transparent"
    >
      <Container style={{ padding: 0 }} maxWidth="md">
        <Toolbar>
          <IconButton
            onClick={togglePanelDrawer}
            edge="start"
            className={styles.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
            <Drawer anchor="left" open={showPanel} onClose={togglePanelDrawer}>
              <div
                role="presentation"
                onClick={togglePanelDrawer}
                onKeyDown={togglePanelDrawer}
                className={styles.list}
              >
                <List>
                  {/* <ListItem onClick={() => router.push('/')} button key={'Main'}>
                    <ListItemText primary={'Main'} />
                  </ListItem> */}
                  <ListItem onClick={() => router.push('/users')} button key={'Users'}>
                    <ListItemText primary={'Users'} />
                  </ListItem>
                </List>
              </div>
            </Drawer>
          </IconButton>
          <Typography className={styles.title} variant="h6">
            {currentRoute}
          </Typography>
          {auth ? (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={menuAnchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={openMenu}
                onClose={handleClose}
              >
                <MenuItem onClick={() => router.push('/profile')}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <Button onClick={() => router.push('/login')}>Login</Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default memo(NavBar);
