import { memo } from 'react';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  loaderBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const Loading = ({ full }) => {
  const style = useStyles();

  return (
    <Box
      height={full ? '100vh' : '100%'}
      width={full ? '100vw' : '100%'}
      className={style.loaderBox}
    >
      <CircularProgress />
    </Box>
  );
};

export default memo(Loading);
