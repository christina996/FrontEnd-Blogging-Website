import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  list: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
  paging: {
    '& > *': {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),

      display: 'flex',
      justifyContent: 'center',
    },
  },

  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '95vh',
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
  cnt: {
    position: 'relative',
  },
  progress: {
    left: '50%',
    top: '300px',
    marginLeft: '-4em',
    position: 'absolute',
  },
  headerText: {
    textAlign: 'center',
    padding: theme.spacing(3),
  },
}));

export default useStyles;
