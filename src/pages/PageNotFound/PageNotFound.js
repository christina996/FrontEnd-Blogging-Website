import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const PageNotFound = () => {
  return (
    <Container>
      <Typography color="primary" variant="h1">
        Oops! Page not found.
      </Typography>
    </Container>
  );
};

export default PageNotFound;
