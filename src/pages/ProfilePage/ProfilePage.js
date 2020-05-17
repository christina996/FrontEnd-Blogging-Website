import React, { Fragment, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import BlogFormDialog from '../../components/BlogFormDialog/BlogFormDialog';
import Blog from '../../components/Blog/Blog';
import Parallax from '../../components/Parallax/Parallax';
import useStyles from './ProfilePageStyle';

import { getProfileById, followUser } from '../../redux/actions/user';
import { getBlogsByUserId } from '../../redux/actions/blog';
import { toast } from 'react-toastify';

const ProfilePage = ({
  user,
  blogs,
  pages,
  getProfileById,
  followUser,
  userId,
  isFollow,
  limit,
  getBlogsByUserId,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();

  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const matches = useMediaQuery('(max-width:700px)');

  const [page, setPage] = useState(1);
  const [load, setLoad] = useState(true);

  let profile = null;

  useEffect(() => {
    setLoad(true);
    getProfileById(id, page, limit)
      .then((res) => {
        setLoad(false);
      })
      .catch((error) => history.push('/error'));
  }, [id]);

  const handelPagination = async (event, page) => {
    setPage(page);
    await getBlogsByUserId(id, page, limit);

    window.scrollTo({
      top: 500,
      left: 0,
      behavior: 'smooth',
    });
  };
  const handelFollow = async () => {
    const message = await followUser(id);
    toast.success(message);
  };
  const getNewBlogs = async () => {
    await getBlogsByUserId(id, 1, limit);
  };
  profile = (
    <div className={classes.progress}>
      <CircularProgress color="primary" thickness={4} size={100} />
    </div>
  );

  if (!load) {
    const ListOfBlogs = blogs.map((post) => (
      <Grid
        key={post._id}
        item
        xs={12}
        sm={9}
        md={5}
        className={classes.navWrapper}
      >
        <Blog post={post} />
      </Grid>
    ));

    profile = (
      <Fragment>
        <Parallax
          small
          filter
          image={require('../../assets/img/profile-bg.jpg')}
        />
        <div
          className={
            matches
              ? classes.marginMainRaised
              : classNames(classes.main, classes.mainRaised)
          }
        >
          <Grid container justify="center">
            <Grid item xs={12} sm={12} md={6}>
              <div className={classes.profile}>
                <div>
                  <img
                    src={require('../../assets/img/boy.jpg')}
                    alt="..."
                    className={imageClasses}
                  />
                </div>
                <div className={classes.name}>
                  <Typography component="h3" variant="h3">
                    {user.firstName + ' ' + user.lastName}
                  </Typography>
                  {userId !== user._id && (
                    <Grid item className={classes.btn}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handelFollow}
                      >
                        {!isFollow ? 'Follow' : 'Un Follow'}
                      </Button>
                    </Grid>
                  )}
                </div>
              </div>
            </Grid>
          </Grid>
          <Grid container justify="center">
            <Grid item xs={12} sm={12} md={8} className={classes.navWrapper}>
              <Typography variant="h4" component="h4">
                Posts
              </Typography>
            </Grid>
            <Grid container justify="center" spacing={2}>
              {ListOfBlogs}
            </Grid>
          </Grid>
          {pages > 1 && (
            <Grid container spacing={4} justify="center">
              <Grid item className={classes.paging}>
                <Pagination
                  count={pages}
                  color="primary"
                  page={page}
                  siblingCount={0}
                  onChange={handelPagination}
                />
              </Grid>
            </Grid>
          )}
        </div>
      </Fragment>
    );
  }
  return (
    <Container className={classes.root}>
      {userId === id && <BlogFormDialog getNewBlogs={getNewBlogs} />}
      {profile}
    </Container>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getProfileById: (id, page, limit) =>
    dispatch(getProfileById(id, page, limit)),
  followUser: (id) => dispatch(followUser(id)),
  getBlogsByUserId: (id, page, limit) =>
    dispatch(getBlogsByUserId(id, page, limit)),
});
const mapStateToProps = (state, ownProps) => ({
  userId: state.auth.userId,
  blogs: state.blogs.blogs,
  pages: state.blogs.NumOfPages,
  user: state.user.user,
  isFollow: state.auth.user?.following.some(
    (el) => el === ownProps.match.params.id
  ),
  limit: state.blogs.limit,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
