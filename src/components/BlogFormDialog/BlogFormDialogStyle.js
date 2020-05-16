import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  addBtn: {
    position: 'fixed',
    bottom: '40px',
    right: '40px',
    zIndex: '55',
  },
  submitBtn: {
    display: 'block',
    marginLeft: 'auto',
    marginTop: '16px',
  },
  input: {
    display: 'none',
  },

  inputFile: {
    width: '70%',
    marginRight: theme.spacing(2),
  },
  img: {
    width: '100%',
    height: '300px',
  },
}));

export default useStyles;
