import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import Copyright from '../../components/Copyright/Copyright';
import Blog from '../../components/Blog/Blog';

import useStyles from './FollowingPageStyle';

import { getFollowingBlogs } from '../../redux/actions/blog';

const FollowingPage = ({ limit, getFollowingBlogs, blogs, pages }) => {
  const classes = useStyles();
  const history = useHistory();

  const [page, setPage] = useState(1);
  const [load, setLoad] = useState(true);
  let pageLoading = null;

  useEffect(() => {
    getFollowingBlogs(page, limit)
      .then((res) => {
        setLoad(false);
      })
      .catch((error) => history.push('/error'));
  }, []);

  const handelPagination = async (event, page) => {
    setPage(page);
    await getFollowingBlogs(page, limit);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  pageLoading = (
    <div className={classes.progress}>
      <CircularProgress color="primary" thickness={4} size={100} />
    </div>
  );

  let ListOfBlogs = blogs.map((post) => (
    <Grid key={post._id} item xs={12} sm={6}>
      <Blog post={post} />
    </Grid>
  ));

  if (!load) {
    pageLoading = (
      <Grid container spacing={4} justify="center" className={classes.list}>
        {ListOfBlogs}
        {pages !== 1 && (
          <Grid item lg={12} md={12} className={classes.paging}>
            <Pagination
              count={pages}
              color="primary"
              page={page}
              onChange={handelPagination}
              siblingCount={0}
            />
          </Grid>
        )}
      </Grid>
    );
  }
  return (
    <div className={classes.root}>
      <Container className={classes.cnt}>
        {/* <BlogFormDialog /> */}
        <Typography className={classes.headerText} variant="h3">
          Followers Posts
        </Typography>
        {pageLoading}
      </Container>
      <footer className={classes.footer}>
        <Copyright />
      </footer>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getFollowingBlogs: (page, limit) => dispatch(getFollowingBlogs(page, limit)),
});

const mapStateToProps = (state, ownProps) => ({
  blogs: state.blogs.blogs,
  pages: state.blogs.NumOfPages,
  limit: state.blogs.limit,
});

export default connect(mapStateToProps, mapDispatchToProps)(FollowingPage);
