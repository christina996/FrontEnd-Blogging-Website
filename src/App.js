import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';

import SignUpForm from './components/SignUpForm/SignUpForm';
import LoginForm from './components/LoginForm/LoginForm';
import NavBar from './components/NavBar/NavBar';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import HomePage from './pages/HomePage/HomePage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import BlogDetailsPage from './pages/BlogDetailsPage/BlogDetailsPage';
import FollowingPage from './pages/FollowingPage/FollowingPage';
import SearchPage from './pages/SearchPage/SearchPage';
import ServerErrorPage from './pages/ServerErrorPage/ServerErrorPage';
import PageNotFound from './pages/PageNotFound/PageNotFound';

function App() {
  return (
    <Fragment>
      <NavBar />
      <ToastContainer />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <ProtectedRoute path="/newsFeed" component={FollowingPage} />
        <ProtectedRoute path="/search" component={SearchPage} />
        <Route path="/blog/:id" component={BlogDetailsPage} />
        <Route path="/login" component={LoginForm} />
        <Route path="/register" component={SignUpForm} />
        <ProtectedRoute path="/profile/:id" component={ProfilePage} />
        <Route path="/error" component={ServerErrorPage} />
        <Route component={PageNotFound} />
      </Switch>
    </Fragment>
  );
}

export default App;
