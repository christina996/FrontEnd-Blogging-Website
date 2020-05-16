import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const ServerErrorPage = () => {
  return (
    <Container>
      <Typography color="primary" variant="h1">
        Something Went Wrong :(
      </Typography>
    </Container>
  );
};

export default ServerErrorPage;
