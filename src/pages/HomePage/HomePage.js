import React, { useEffect, useState, Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import BlogFormDialog from '../../components/BlogFormDialog/BlogFormDialog';
import Copyright from '../../components/Copyright/Copyright';
import Blog from '../../components/Blog/Blog';
import useStyles from './HomePageStyle';

import { getBlogs } from '../../redux/actions/blog';

const HomePage = ({ token, limit, getBlogs, blogs, pages }) => {
  const classes = useStyles();
  const history = useHistory();

  const [page, setPage] = useState(1);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    getBlogs(page, limit)
      .then((res) => {
        setLoad(false);
      })
      .catch((error) => history.push('/error'));
  }, []);

  const getNewBlogs = async () => {
    await getBlogs(1, limit);
  };

  const handelPagination = async (event, page) => {
    setPage(page);
    await getBlogs(page, limit);

    window.scrollTo({
      top: 500,
      left: 0,
      behavior: 'smooth',
    });
  };

  let pageLoading = (
    <div className={classes.progress}>
      <CircularProgress color="primary" thickness={4} size={100} />
    </div>
  );

  if (!load) {
    const ListOfBlogs = blogs.map((post) => (
      <Grid item xs={12} md={6} sm={8} key={post._id}>
        <Blog post={post} />
      </Grid>
    ));

    pageLoading = (
      <div className={classes.root}>
        <Container>
          <Grid container spacing={3} justify="space-between">
            <Grid
              item
              lg={6}
              md={8}
              sm={10}
              xs={12}
              className={classes.wrapContainer}
            >
              <Grid
                className={classes.heroDescription}
                container
                justify="center"
              >
                <Typography
                  component="h1"
                  variant="h2"
                  align="center"
                  color="textPrimary"
                  gutterBottom
                >
                  BlogZee
                </Typography>
                <Typography variant="h5" align="center" color="textSecondary">
                  Publish your passions your way. Whether you'd like to share
                  your knowledge, experiences or the latest news.
                </Typography>
                <Grid item lg={6} sm={12} className={classes.heroButtons}>
                  <Grid container spacing={2} justify="center">
                    {!token ? (
                      <Button
                        component={Link}
                        to="/register"
                        variant="contained"
                        color="primary"
                      >
                        Get Started
                      </Button>
                    ) : (
                      <Button
                        component={Link}
                        to="/newsFeed"
                        variant="contained"
                        color="primary"
                      >
                        Followers NewsFeed
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              lg={6}
              md={8}
              sm={10}
              xs={12}
              className={classes.wrapContainer}
            >
              <CardMedia
                className={classes.cardMedia}
                image={require('../../assets/img/50426.jpg')}
              />
            </Grid>
          </Grid>
          <Grid item>
            {token && <BlogFormDialog getNewBlogs={getNewBlogs} />}
            <Typography className={classes.heroText} variant="h3">
              Blogs
            </Typography>
            <Grid
              container
              spacing={4}
              justify="center"
              className={classes.list}
            >
              {ListOfBlogs}
              {pages !== 1 && (
                <Grid item lg={12} xs={12} className={classes.paging}>
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
          </Grid>
        </Container>
        <footer className={classes.footer}>
          <Copyright />
        </footer>
      </div>
    );
  }

  return <Fragment>{pageLoading}</Fragment>;
};
const mapDispatchToProps = (dispatch) => ({
  getBlogs: (page, limit) => dispatch(getBlogs(page, limit)),
});

const mapStateToProps = (state) => ({
  blogs: state.blogs.blogs,
  pages: state.blogs.NumOfPages,
  token: state.auth.token,
  limit: state.blogs.limit,
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
