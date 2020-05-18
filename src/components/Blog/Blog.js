import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import moment from 'moment';

import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';

import useStyles from './BlogStyle';

const Blog = ({ post }) => {
  const classes = useStyles();

  return (
    <CardActionArea
      className={classes.box}
      component={Link}
      to={`/blog/${post._id}`}
    >
      <CardMedia
        className={classes.cardMedia}
        image={post.photo}
        // image={'https://source.unsplash.com/random'}
        title={post.title}
      />
      <div className={classes.cardText}>
        <CardHeader
          className={classes.cardText}
          title={post.title}
          subheader={moment(post.createdAt).format('MMM D, YYYY')}
        />
        <CardContent>
          <Typography variant="subtitle1" paragraph>
            {post.body?.slice(0, 100)}...
          </Typography>
          <Typography color="primary">Continue reading</Typography>
        </CardContent>
      </div>
    </CardActionArea>
  );
};
Blog.propTypes = {
  post: PropTypes.object,
};

export default Blog;
