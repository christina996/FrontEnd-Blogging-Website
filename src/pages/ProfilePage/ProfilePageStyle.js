import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  imgRoundedCircle: {
    borderRadius: '50% !important',
  },
  imgRaised: {
    boxShadow:
      '0 5px 15px -8px rgba(0, 0, 0, 0.24), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
  },
  imgFluid: {
    maxWidth: '100%',
    height: 'auto',
  },
  profile: {
    textAlign: 'center',
    '& img': {
      maxWidth: '160px',
      width: '100%',
      margin: '0 auto',
      transform: 'translate3d(0, -50%, 0)',
    },
  },

  name: {
    marginTop: '-80px',
  },
  main: {
    background: '#FFFFFF',
    position: 'relative',
    zIndex: '3',
  },
  mainRaised: {
    margin: '-60px 30px 0px',
    borderRadius: '6px',
    boxShadow:
      '0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
  },
  marginMainRaised: {
    background: '#FFFFFF',
    position: 'relative',
    zIndex: '3',
    margin: '-60px 5px 0px',
    borderRadius: '6px',
    boxShadow:
      '0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
  },
  navWrapper: {
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing(2),
  },
  progress: {
    left: '50%',
    top: '300px',
    marginLeft: '-4em',
    position: 'absolute',
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '95vh',
    position: 'relative',
  },
  paging: {
    '& > *': {
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(2),
    },
  },
}));

export default useStyles;
