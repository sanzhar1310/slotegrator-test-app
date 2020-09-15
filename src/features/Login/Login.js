import { memo, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Alert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useLogin } from '../../hooks/useLogin';
import { useAuth } from '../../hooks/useAuth';
import { Loading } from '../../components/Loading';

const useStyles = makeStyles((theme) => ({
  formContainer: {
    marginTop: theme.spacing(16),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submitButton: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  const style = useStyles();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [successAuth, loadingPage] = useAuth();
  const [success, loadingLogin, error, submit, reset] = useLogin(username, password);

  useEffect(() => {
    if (successAuth) router.push('/');
  }, [successAuth]);

  useEffect(() => {
    if (success) router.push('/profile');
  }, [success]);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      submit();
    },
    [username, password]
  );

  if (loadingPage) {
    return <Loading full />;
  }
  return (
    <Box height="100vh">
      <Container maxWidth="xs" className={style.formContainer}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={style.form} onSubmit={onSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <Button
            disabled={loadingLogin}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={style.submitButton}
          >
            Login
          </Button>
        </form>
        <Snackbar open={error} autoHideDuration={6000} onClose={reset}>
          <Alert variant="filled" severity="error">
            Username or password is wrong
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default memo(Login);
