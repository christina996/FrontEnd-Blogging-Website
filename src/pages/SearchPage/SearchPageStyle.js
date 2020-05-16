import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    boxShadow: '0 3px 10px rgba(0,0,0,0.3)',
    marginBottom: theme.spacing(3),
    margin: 'auto',
  },
  paging: {
    '& > *': {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),

      display: 'flex',
      justifyContent: 'center',
    },
  },
  progress: {
    left: '50%',
    top: '300px',
    marginLeft: '-4em',
    position: 'absolute',
  },
  rootSearch: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    margin: 'auto',
    width: '70%',
    boxShadow: '0 3px 10px rgba(0,0,0,0.3)',

    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  posts: {
    width: '100%',
  },
  navWrapper: {
    margin: 'auto',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

export default useStyles;
