import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import moment from 'moment';

import CircularProgress from '@material-ui/core/CircularProgress';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CardMedia from '@material-ui/core/CardMedia';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import BlogFormDialog from '../../components/BlogFormDialog/BlogFormDialog';
import DeleteModel from '../../components/DeleteModel/DeleteModel';
import useStyles from './BlogDetailsPageStyle';

import { getBlogById } from '../../Api/blog';

const BlogDetailsPage = ({ userId }) => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();

  const [load, setLoad] = useState(true);
  const [blog, setBlog] = useState(null);

  const matches = useMediaQuery('(max-width:1302px)');

  useEffect(() => {
    getBlogById(id)
      .then((blog) => {
        setBlog(blog);
        setLoad(false);
      })
      .catch((error) => history.push('/error'));
  }, []);

  const updateBlogById = (newBlog) => {
    setBlog(newBlog);
  };

  let pageLoading = (
    <div className={classes.progress}>
      <CircularProgress color="primary" thickness={4} size={100} />
    </div>
  );

  if (!load) {
    let tagList = null;

    if (blog.tags.length)
      tagList = blog?.tags.map((el) => (
        <Chip label={el} key={el} className={classes.chip} color="primary" />
      ));

    pageLoading = (
      <Grid container spacing={4} justify="center">
        <Grid item lg={6} md={8} xs={10}>
          <Card className={classes.cardImage}>
            <CardMedia
              className={classes.media}
              component="img"
              // image={'https://source.unsplash.com/random'}
              image={'http://localhost:3000/' + blog?.photo}
            />
          </Card>
        </Grid>
        <Grid item lg={6} md={8} xs={10}>
          <Grid container spacing={4} justify="center">
            <Paper
              className={!matches ? classes.paper : classes.paperSmallScreen}
            >
              <Typography variant="h2" component="h3" gutterBottom>
                {blog?.title}
              </Typography>
              <Typography variant="h6" component="h4" gutterBottom>
                {moment(blog?.createdAt).format('MMM D, YYYY')}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {blog?.body}
              </Typography>

              {userId === blog?.author?._id && (
                <div className={classes.btn}>
                  <DeleteModel id={blog._id} blogName={blog.title} />
                </div>
              )}

              <Typography variant="h5" component="h2" gutterBottom>
                {tagList}
              </Typography>

              <hr />
              <Typography variant="h6" component="h4">
                Author:
                {userId ? (
                  <Link
                    to={`/profile/${blog?.author?._id}`}
                    className={classes.link}
                  >
                    {`${blog?.author?.firstName} ${blog?.author?.lastName}`}
                  </Link>
                ) : (
                  <Box component="span">
                    {` ${blog?.author?.firstName} ${blog?.author?.lastName}`}
                  </Box>
                )}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  return (
    <div className={classes.root}>
      {userId === blog?.author?._id && (
        <BlogFormDialog
          isEdit={true}
          editingBlog={blog}
          updateBlogById={updateBlogById}
        />
      )}
      <Container component="main">{pageLoading}</Container>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
  };
};

export default connect(mapStateToProps)(BlogDetailsPage);
