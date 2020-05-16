import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  box: {
    filter: 'grayscale(0.5)',
    boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
    borderRadius: '20px',
    transition: 'all .2s ease-in-out',
    height: '100%',
    '&:hover': {
      boxShadow: '0 3px 10px rgba(0,0,0,0.5)',
      transform: 'scale(1.02) ',
      filter: 'grayscale(0)',
    },
  },
  cardMedia: {
    width: '100%',
    height: '300px',
    borderRadius: '20px 20px 0px 0px',
  },
  cardText: {
    wordBreak: 'break-all',
  },
}));

export default useStyles;
