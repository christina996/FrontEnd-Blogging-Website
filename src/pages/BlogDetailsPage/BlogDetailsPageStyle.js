import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  cardImage: {
    boxShadow: '0 3px 10px rgba(0,0,0,0.3)',
  },
  progress: {
    left: '50%',
    top: '300px',
    marginLeft: '-4em',
    position: 'absolute',
  },
  paper: {
    maxWidth: '55rem',
    boxShadow: '0 3px 10px rgba(0,0,0,0.3)',
    padding: theme.spacing(4),
    position: 'absolute',
    top: '30%',
    marginLeft: 'auto',
    wordBreak: 'break-word',
    textAlign: 'justify',
  },
  paperSmallScreen: {
    boxShadow: '0 3px 10px rgba(0,0,0,0.3)',
    padding: theme.spacing(4),
    wordBreak: 'break-word',
    textAlign: 'justify',
    margin: '-60px 0px 0px',
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    position: 'relative',
    paddingTop: theme.spacing(1),
  },
  chip: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
  btn: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  link: {
    color: theme.palette.primary.dark,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
      color: theme.palette.secondary.light,
    },
  },
}));

export default useStyles;
