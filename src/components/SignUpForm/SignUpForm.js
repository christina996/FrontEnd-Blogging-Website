import React from 'react';
import { NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { object, string } from 'yup';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import useStyles from './SignUpFormStyle';
import { auth } from '../../redux/actions/auth';

const userSchema = object().shape({
  firstName: string().min(3).required('First Name is required!'),
  lastName: string().min(3).required('Last Name is required!'),
  email: string().email().required('email is required!'),
  password: string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
    )
    .required('password is required'),
});

const SignUpForm = ({ onAuth, history }) => {
  const classes = useStyles();

  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
    validationSchema: userSchema,
  });

  const onSubmit = (data) => {
    onAuth(data, true)
      .then((res) => {
        toast.success(res.data.message);
        history.replace('/');
      })
      .catch((err) => {
        for (let key in err.errors) {
          let value = err.errors[key];
          toast.error(value.message);
        }
      });
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                id="firstName"
                label="First Name"
                type="text"
                variant="outlined"
                required
                fullWidth
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                type="text"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                error={!!errors.email}
                helperText={errors.email?.message}
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={!!errors.password}
                helperText={errors.password?.message}
                inputRef={register}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link component={NavLink} to="/login" href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

const mapDispatchToProps = (dispatch) => ({
  onAuth: (data, isSignUp) => dispatch(auth(data, isSignUp)),
});
export default connect(null, mapDispatchToProps)(SignUpForm);
