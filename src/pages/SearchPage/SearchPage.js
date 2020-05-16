import React, { useState } from 'react';
import { connect } from 'react-redux';

import Container from '@material-ui/core/Container';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import Blog from '../../components/Blog/Blog';
import useStyles from './SearchPageStyle';
import { searchForBlogs } from '../../redux/actions/blog';

const SearchPage = ({ pages, blogs, searchForBlogs }) => {
  const classes = useStyles();

  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [tab, setTab] = useState(0);
  const [load, setLoad] = useState(false);

  const handelPagination = async (event, page) => {
    setPage(page);

    await searchForBlogs(page, 2, tab, searchInput.toLowerCase());

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  let ListOfBlogs = null;

  const handelSearch = async (event) => {
    setSearchInput(event.target.value);
    await searchForBlogs(page, 2, tab, event.target.value);
    setLoad(true);
  };

  const handleChange = async (event, newValue) => {
    setTab(newValue);
    setPage(1);

    await searchForBlogs(1, 2, newValue, searchInput);
    setLoad(true);
  };

  if (load) {
    if (blogs.length > 0) ListOfBlogs = <Typography>No Blogs Found</Typography>;
    ListOfBlogs = blogs.map((post) => (
      <Grid key={post._id} item lg={6} sm={12} className={classes.navWrapper}>
        <Blog post={post} />
      </Grid>
    ));
  }

  return (
    <Container>
      <Paper component="form" className={classes.rootSearch}>
        <InputBase
          className={classes.input}
          placeholder="Search For Blogs"
          inputProps={{ 'aria-label': 'Search For Blogs' }}
          onChange={handelSearch}
        />
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      <Paper square className={classes.root}>
        <Tabs
          value={tab}
          onChange={handleChange}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
          aria-label="icon label tabs example"
        >
          <Tab label="Author" />
          <Tab label="Title" />
          <Tab label="Tag" />
        </Tabs>
      </Paper>
      <Grid container spacing={3} direction="row" justify="center">
        <Grid item xs={12} sm={9} md={6} lg={12} className={classes.posts}>
          {ListOfBlogs}
        </Grid>
        {pages > 1 && load && (
          <Grid lg={12} sm={12} item className={classes.paging}>
            <Pagination
              count={pages}
              onChange={handelPagination}
              color="primary"
              page={page}
              siblingCount={0}
            />
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  blogs: state.blogs.blogs,
  pages: state.blogs.NumOfPages,
});
const mapDispatchToProps = (dispatch) => ({
  searchForBlogs: (page, limit, searchTerm, value) =>
    dispatch(searchForBlogs(page, limit, searchTerm, value)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
