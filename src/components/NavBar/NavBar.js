import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import AccountCircle from '@material-ui/icons/AccountCircle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Menu from '@material-ui/core/Menu';

const NavBar = ({ token, userId }) => {
  const matches = useMediaQuery('(max-width:600px)');

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <div style={{ flexGrow: 1 }}>
          <Button component={Link} to="/" color="inherit">
            BlogZee
          </Button>
          {token && (
            <Button component={Link} to="/newsFeed" color="inherit">
              {' '}
              Followers News
            </Button>
          )}
        </div>
        {matches && (
          <IconButton
            color="inherit"
            aria-label="menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onClose={handleClose}
        >
          {token && (
            <div>
              <MenuItem to={`/profile/${userId}`} component={Link}>
                <AccountCircle color="primary" />

                <Typography> Profile</Typography>
              </MenuItem>
              <MenuItem component={Link} to="/search">
                <SearchIcon color="primary" />
                <Typography> Search</Typography>
              </MenuItem>
            </div>
          )}
          {!token && (
            <div>
              <MenuItem component={Link} to="/register">
                <Typography> SignUp </Typography>
              </MenuItem>
              <MenuItem component={Link} to="/login">
                <Typography> LogIn </Typography>
              </MenuItem>
            </div>
          )}
        </Menu>

        {!matches && !token && (
          <div>
            <Button component={Link} to="/register" color="inherit">
              SIGNUP
            </Button>
            <Button component={Link} to="/login" color="inherit">
              LOGIN
            </Button>
          </div>
        )}
        {!matches && token && (
          <div>
            <IconButton
              component={Link}
              to={`/profile/${userId}`}
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <IconButton
              aria-label="search"
              color="inherit"
              to="/search"
              component={Link}
            >
              <SearchIcon />
            </IconButton>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
  userId: state.auth.userId,
});
export default connect(mapStateToProps)(NavBar);
